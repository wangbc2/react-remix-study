import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  console.log("loader gogo");

  return json({
    posts: await getPosts(),
  });
};

const Posts = () => {
  const { posts } = useLoaderData<typeof loader>();

  // console.log("loaderData", loaderData);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id + ""}>
              <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
