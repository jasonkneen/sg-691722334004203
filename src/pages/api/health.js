import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.status(200).json({ status: 'OK', message: 'API and database connection are working' });
    } catch (error) {
      console.error('Health check failed:', error);
      res.status(500).json({ status: 'Error', message: 'API or database connection issue', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}