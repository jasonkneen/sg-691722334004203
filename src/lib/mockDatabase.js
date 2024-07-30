import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'mockDb.json');

// Initialize database if it doesn't exist
if (!fs.existsSync(dbPath)) {
  const initialData = {
    entries: [
      {
        id: 1,
        title: 'First Catch',
        weight: 5.2,
        location: 'Lake Example',
        date: new Date('2023-06-15').toISOString(),
        notes: 'My first big catch of the season!',
        tags: ['bass', 'summer'],
        userId: 1
      }
    ],
    tags: ['bass', 'summer'],
    users: [{ id: 1, email: 'test@example.com', name: 'Test User' }]
  };
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

const readDb = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const mockDatabase = {
  entry: {
    findMany: async () => {
      const db = readDb();
      return db.entries;
    },
    create: async (data) => {
      const db = readDb();
      const newEntry = { id: db.entries.length + 1, ...data.data };
      db.entries.push(newEntry);
      writeDb(db);
      return newEntry;
    },
    update: async (where, data) => {
      const db = readDb();
      const index = db.entries.findIndex(entry => entry.id === where.id);
      if (index !== -1) {
        db.entries[index] = { ...db.entries[index], ...data.data };
        writeDb(db);
        return db.entries[index];
      }
      throw new Error('Entry not found');
    },
    delete: async (where) => {
      const db = readDb();
      const index = db.entries.findIndex(entry => entry.id === where.id);
      if (index !== -1) {
        const deletedEntry = db.entries.splice(index, 1)[0];
        writeDb(db);
        return deletedEntry;
      }
      throw new Error('Entry not found');
    },
  },
  tag: {
    findMany: async () => {
      const db = readDb();
      return db.tags;
    },
    create: async (data) => {
      const db = readDb();
      const newTag = { id: db.tags.length + 1, ...data };
      db.tags.push(newTag);
      writeDb(db);
      return newTag;
    },
  },
  user: {
    findUnique: async (where) => {
      const db = readDb();
      return db.users.find(user => user.id === where.id);
    },
  },
};

export default mockDatabase;