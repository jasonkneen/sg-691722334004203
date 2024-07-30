import mockDatabase from '../../../lib/mockDatabase';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const entries = await mockDatabase.entry.findMany();
      const entry = entries.find(e => e.id === parseInt(id));
      if (entry) {
        res.status(200).json(entry);
      } else {
        res.status(404).json({ error: 'Entry not found' });
      }
    } else if (req.method === 'PUT') {
      const updatedEntry = await mockDatabase.entry.update({ id: parseInt(id) }, { data: req.body });
      res.status(200).json(updatedEntry);
    } else if (req.method === 'DELETE') {
      await mockDatabase.entry.delete({ id: parseInt(id) });
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}