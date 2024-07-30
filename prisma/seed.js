const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });

  const entry = await prisma.entry.create({
    data: {
      title: 'Big Bass Catch',
      weight: 5.2,
      location: 'Lake Example',
      notes: 'Caught using a lure in the early morning.',
      date: new Date('2023-06-15'),
      userId: user.id,
      tags: { create: [{ name: 'bass' }, { name: 'lure' }] },
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });