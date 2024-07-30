import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const entries = await prisma.entry.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { location: { contains: q } },
            { notes: { contains: q } },
            { tags: { some: { name: { contains: q } } } },
          ],
        },
        include: {
          tags: true,
        },
        orderBy: {
          date: 'desc',
        },
      });

      res.status(200).json(entries);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ error: 'Failed to perform search' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}