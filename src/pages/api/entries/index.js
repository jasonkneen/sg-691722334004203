import prisma from '../../../lib/prismaClient';

export default async function handler(req, res) {
  try {
    if (!prisma) {
      throw new Error('Prisma client is not initialized');
    }

    if (req.method === 'GET') {
      console.log('Fetching entries...');
      const entries = await prisma.entry.findMany({
        include: { tags: true },
        orderBy: { createdAt: 'desc' },
      });
      console.log(`Found ${entries.length} entries`);
      res.status(200).json(entries);
    } else if (req.method === 'POST') {
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
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}