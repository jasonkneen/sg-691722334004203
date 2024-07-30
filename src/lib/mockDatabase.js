// Mock database to simulate Prisma functionality
let entries = [];
let tags = [];
let users = [{ id: 1, email: 'test@example.com', name: 'Test User' }];

const mockDatabase = {
  entry: {
    findMany: async () => entries,
    create: async (data) => {
      const newEntry = { id: entries.length + 1, ...data.data };
      entries.push(newEntry);
      return newEntry;
    },
  },
  tag: {
    findMany: async () => tags,
    create: async (data) => {
      const newTag = { id: tags.length + 1, ...data };
      tags.push(newTag);
      return newTag;
    },
  },
  user: {
    findUnique: async (where) => users.find(user => user.id === where.id),
  },
};

export default mockDatabase;