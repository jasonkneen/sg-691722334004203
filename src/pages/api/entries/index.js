import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('Fetching entries...');
      const entries = await prisma.entry.findMany({
        include: { tags: true },
        orderBy: { createdAt: 'desc' },
      });
      console.log(`Found ${entries.length} entries`);
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).json({ error: 'Failed to fetch entries', details: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      console.log('Creating new entry...');
      const { title, weight, location, notes, imageUrl, date, tags } = req.body;
      const entry = await prisma.entry.create({
        data: {
          title,
          weight: weight ? parseFloat(weight) : null,
          location,
          notes,
          imageUrl,
          date: new Date(date),
          user: { connect: { id: 1 } }, // Temporary: connect to a default user
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
        include: { tags: true },
      });
      console.log('Entry created successfully:', entry.id);
      res.status(201).json(entry);
    } catch (error) {
      console.error('Error creating entry:', error);
      res.status(500).json({ error: 'Failed to create entry', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}