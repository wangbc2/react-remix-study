import { prisma } from "~/lib/prisma";

export type Post = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
};

export const getPosts = () => {
  return prisma.post.findMany();
};

export const getPost = (id: number) => {
  return prisma.post.findUnique({ where: { id } });
};

export const createPost = (post: Post) => {
  return prisma.post.create({ data: post });
};
