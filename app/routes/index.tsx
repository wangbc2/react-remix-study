import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Link to="/posts">Go Posts</Link>
      <p></p>
      <Link to="/posts/admin">Go Posts(Admin)</Link>
    </div>
  );
}
