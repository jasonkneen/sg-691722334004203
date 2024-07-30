import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const entries = await prisma.entry.findMany({
        include: { tags: true },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch entries' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, weight, location, notes, imageUrl, date, tags, userId } = req.body;
      const entry = await prisma.entry.create({
        data: {
          title,
          weight: parseFloat(weight),
          location,
          notes,
          imageUrl,
          date: new Date(date),
          user: { connect: { id: userId } },
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
        include: { tags: true },
      });
      res.status(201).json(entry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create entry' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}