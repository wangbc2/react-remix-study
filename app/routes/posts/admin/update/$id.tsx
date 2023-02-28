import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { namedAction } from "remix-utils";
import { deletePost, getPost, updatePost } from "~/models/post.server";

export const loader = async ({ params }: LoaderArgs) => {
  return json({
    post: await getPost(Number(params.id)),
  });
};

export const action = async ({ request, context, params }: ActionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");

  // console.log("action", action);

  if (action === "update") {
    const title = formData.get("title");
    const content = formData.get("content");

    // console.log("request", request);
    // console.log("context", context);
    // console.log("params", params);

    await updatePost({
      id: Number(params.id),
      title,
      content,
      authorId: 1,
    } as any);

    return redirect("/posts/admin");
  } else if (action === "delete") {
    await deletePost(Number(params.id));

    return redirect("/posts/admin");
  }
};

const Update = () => {
  const { post } = useLoaderData<typeof loader>();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  useEffect(() => {
    setTitle(post?.title || "");
    setContent(post?.content || "");
  }, [post]);

  return (
    <div>
      <Form method="post" action="?/update">
        <p>
          <label>
            <span>title</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <span>content</span>
            <input
              type="text"
              name="content"
              value={content || ""}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
        </p>
        <p>
          <button type="submit" name="action" value="update">
            수정
          </button>
          <button type="submit" name="action" value="delete">
            삭제
          </button>
        </p>
      </Form>
    </div>
  );
};

export default Update;
