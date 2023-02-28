import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getPost, deletePost } from "~/models/post.server";

export const loader = async ({ params }: LoaderArgs) => {
  return json({
    post: await getPost(Number(params.id)),
  });
};

export const action = async ({ params }: ActionArgs) => {
  await deletePost(Number(params.id));

  return redirect("/posts/admin");
};

const Delete = () => {
  const { post } = useLoaderData<typeof loader>();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  useEffect(() => {
    setTitle(post?.title || "");
    setContent(post?.content || "");
  }, [post]);

  return (
    <div>
      <Form method="post">
        <p>
          <label>
            <span>title</span>
            <span>{title}</span>
          </label>
        </p>
        <p>
          <label>
            <span>content</span>
            <span>{content}</span>
          </label>
        </p>
        <p>
          <button type="submit">삭제</button>
        </p>
      </Form>
    </div>
  );
};

export default Delete;
