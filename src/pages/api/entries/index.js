import mockDatabase from '../../../lib/mockDatabase';

export default async function handler(req, res) {
  console.log('API route /api/entries called');
  try {
    if (req.method === 'GET') {
      console.log('Fetching entries...');
      const entries = await mockDatabase.entry.findMany();
      console.log(`Found ${entries.length} entries:`, entries);
      res.status(200).json(entries);
    } else if (req.method === 'POST') {
      console.log('Creating new entry...', req.body);
      const { title, weight, location, notes, imageUrl, date, tags } = req.body;
      const entry = await mockDatabase.entry.create({
        data: {
          title,
          weight: weight ? parseFloat(weight) : null,
          location,
          notes,
          imageUrl,
          date: new Date(date).toISOString(),
          userId: 1, // Temporary: connect to a default user
          tags: tags,
        },
      });
      console.log('Entry created successfully:', entry);
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