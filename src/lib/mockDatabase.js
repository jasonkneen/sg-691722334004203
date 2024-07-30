import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'mockDb.json');

console.log('Mock database path:', dbPath);

// Initialize database if it doesn't exist
if (!fs.existsSync(dbPath)) {
  console.log('Initializing mock database...');
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
  console.log('Mock database initialized');
} else {
  console.log('Mock database already exists');
}

const readDb = () => {
  console.log('Reading mock database...');
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

const writeDb = (data) => {
  console.log('Writing to mock database...');
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const mockDatabase = {
  entry: {
    findMany: async () => {
      console.log('Mock: Finding many entries');
      const db = readDb();
      return db.entries;
    },
    findUnique: async (where) => {
      console.log('Mock: Finding unique entry', where);
      const db = readDb();
      return db.entries.find(entry => entry.id === where.id);
    },
    create: async (data) => {
      console.log('Mock: Creating entry', data);
      const db = readDb();
      const newEntry = { id: db.entries.length + 1, ...data.data };
      db.entries.push(newEntry);
      writeDb(db);
      return newEntry;
    },
    update: async (where, data) => {
      console.log('Mock: Updating entry', where, data);
      const db = readDb();
      const index = db.entries.findIndex(entry => entry.id === where.id);
      if (index !== -1) {
        db.entries[index] = { ...db.entries[index], ...data.data };
        writeDb(db);
        return db.entries[index];
      }
      return null;
    },
    delete: async (where) => {
      console.log('Mock: Deleting entry', where);
      const db = readDb();
      const index = db.entries.findIndex(entry => entry.id === where.id);
      if (index !== -1) {
        const deletedEntry = db.entries.splice(index, 1)[0];
        writeDb(db);
        return deletedEntry;
      }
      return null;
    },
  },
  tag: {
    findMany: async () => {
      console.log('Mock: Finding many tags');
      const db = readDb();
      return db.tags;
    },
    create: async (data) => {
      console.log('Mock: Creating tag', data);
      const db = readDb();
      const newTag = { id: db.tags.length + 1, ...data };
      db.tags.push(newTag);
      writeDb(db);
      return newTag;
    },
  },
  user: {
    findUnique: async (where) => {
      console.log('Mock: Finding unique user', where);
      const db = readDb();
      return db.users.find(user => user.id === where.id);
    },
  },
};

export default mockDatabase;