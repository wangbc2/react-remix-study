import { ActionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createPost } from "~/models/post.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const content = formData.get("content");

  await createPost({ title, content, authorId: 1 } as any);

  return redirect("/posts/admin");
};

export default function New() {
  return (
    <div>
      <Form method="post">
        <p>
          <label>
            <span>title</span>
            <input type="text" name="title" />
          </label>
        </p>
        <p>
          <label>
            <span>content</span>
            <input type="text" name="content" />
          </label>
        </p>
        <p>
          <button type="submit">등록</button>
        </p>
      </Form>
    </div>
  );
}
