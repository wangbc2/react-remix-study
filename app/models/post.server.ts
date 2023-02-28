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

export const updatePost = (post: Post) => {
  return prisma.post.update({ where: { id: post.id }, data: post });
};

export const deletePost = (id: number) => {
  return prisma.post.delete({ where: { id } });
};
