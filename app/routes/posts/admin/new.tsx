import { Outlet } from "@remix-run/react";

export default function New() {
  return (
    <div>
      <p>New Title</p>
      <Outlet />
    </div>
  );
}
