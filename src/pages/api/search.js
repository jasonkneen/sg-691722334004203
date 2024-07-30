import mockDatabase from '../../lib/mockDatabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const entries = await mockDatabase.entry.findMany();
      const results = entries.filter(entry => 
        entry.title.toLowerCase().includes(q.toLowerCase()) ||
        entry.location.toLowerCase().includes(q.toLowerCase()) ||
        entry.notes.toLowerCase().includes(q.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(q.toLowerCase()))
      );

      res.status(200).json(results);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ error: 'Failed to perform search' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}