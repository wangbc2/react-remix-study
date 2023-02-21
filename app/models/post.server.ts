import { prisma } from "~/lib/prisma";

export const getPosts = () => {
  return prisma.post.findMany();
};
