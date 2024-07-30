import mockDatabase from '../../lib/mockDatabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const testEntry = await mockDatabase.entry.create({
        data: { title: 'Test Entry', date: new Date(), userId: 1 }
      });
      res.status(200).json({ status: 'OK', message: 'API and mock database are working', testEntry });
    } catch (error) {
      console.error('Health check failed:', error);
      res.status(500).json({ status: 'Error', message: 'API or mock database issue', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}