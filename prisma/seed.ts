import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const test = await prisma.post.create({
    data: {
      title: "Follow Prisma on Twitter2",
      content: "https://twitter.com/prisma55",
      published: false,
      authorId: 2,
    },
  });

  const test2 = await prisma.post.create({
    data: {
      title: "Follow Prisma on 트위터",
      content: "https://twitter.com/프리스마",
      published: false,
      authorId: 2,
    },
  });

  console.log({ test, test2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
