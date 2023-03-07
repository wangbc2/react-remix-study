import { ActionArgs, json } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { deletePost, getPosts, Post } from "~/models/post.server";

export const loader = async () => {
  console.log("loader gogo");

  return json({
    posts: await getPosts(),
  });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  console.log(Object.fromEntries(formData));

  const { id } = Object.fromEntries(formData);

  await new Promise((res) => setTimeout(res, 1000));
  await deletePost(Number(id));

  return "./";
};

const Posts = () => {
  const { posts } = useLoaderData<typeof loader>();

  // console.log("loaderData", loaderData);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <PostItem post={post} />
        ))}
      </ul>
      <ul>
        <Outlet />
      </ul>
    </div>
  );
};

const PostItem = ({ post }: { post: Post }) => {
  // const transition = useTransition();
  const fetcher = useFetcher();
  const isDeleting = Boolean(
    Number(fetcher.submission?.formData.get("id")) === post.id
  );

  return (
    <li
      style={{
        opacity: isDeleting ? 0.25 : 1,
      }}
      key={post.id}
    >
      <Link to={`update/${post.id}`}>
        <span>{post.title}</span>
      </Link>
      <fetcher.Form method="post">
        <input type="hidden" name="id" value={post.id} />
        <button type="submit" name="_action" value="delete">
          삭제
        </button>
      </fetcher.Form>
    </li>
  );
};

export default Posts;
