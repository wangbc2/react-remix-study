import { ActionArgs, redirect } from "@remix-run/node";
import {
  Form,
  useNavigate,
  useNavigation,
  useTransition,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createPost } from "~/models/post.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const content = formData.get("content");

  await new Promise((res) => setTimeout(res, 1000));

  await createPost({ title, content, authorId: 1 } as any);

  // return redirect("/posts/admin");

  return true;
};

export default function New() {
  // const navigation = useNavigation();
  const transition = useTransition();
  const isCreating = Boolean(transition.state === "submitting");

  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isCreating) {
      formRef.current?.reset();
      titleRef.current?.focus();
    }
  }, [isCreating]);

  return (
    <div>
      <Form ref={formRef} method="post">
        <p>
          <label>
            <span>title</span>
            <input ref={titleRef} type="text" name="title" />
          </label>
        </p>
        <p>
          <label>
            <span>content</span>
            <input type="text" name="content" />
          </label>
        </p>
        <p>
          <button type="submit">{isCreating ? "등록중" : "등록"}</button>
        </p>
      </Form>
    </div>
  );
}
