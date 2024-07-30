import mockDatabase from '../../../lib/mockDatabase';

export default async function handler(req, res) {
  const { id } = req.query;
  console.log(`API route /api/entries/${id} called`);

  try {
    if (req.method === 'GET') {
      console.log(`Fetching entry with id: ${id}`);
      const entry = await mockDatabase.entry.findUnique({ id: parseInt(id) });
      if (entry) {
        console.log('Entry found:', entry);
        res.status(200).json(entry);
      } else {
        console.log('Entry not found');
        res.status(404).json({ error: 'Entry not found' });
      }
    } else if (req.method === 'PUT') {
      console.log(`Updating entry with id: ${id}`);
      const updatedEntry = await mockDatabase.entry.update({ id: parseInt(id) }, { data: req.body });
      if (updatedEntry) {
        console.log('Entry updated:', updatedEntry);
        res.status(200).json(updatedEntry);
      } else {
        console.log('Entry not found for update');
        res.status(404).json({ error: 'Entry not found' });
      }
    } else if (req.method === 'DELETE') {
      console.log(`Deleting entry with id: ${id}`);
      const deletedEntry = await mockDatabase.entry.delete({ id: parseInt(id) });
      if (deletedEntry) {
        console.log('Entry deleted:', deletedEntry);
        res.status(204).end();
      } else {
        console.log('Entry not found for deletion');
        res.status(404).json({ error: 'Entry not found' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}