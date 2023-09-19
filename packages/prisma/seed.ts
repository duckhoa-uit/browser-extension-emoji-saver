import prisma from '.';

async function main() {}

main()
  // .then(() => mainAppStore())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
