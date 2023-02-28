import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderArgs) => {
  return json({
    post: await getPost(Number(params.id)),
  });
};

const Post = () => {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div>
      <h3>{post?.title}</h3>
      <div>{post?.content}</div>
    </div>
  );
};

export default Post;
