import { Link, Outlet } from "react-router-dom";

const LinkLayout = () => {
  return (
    <div>
      <Link path="/home">Home</Link>
      <Link path="/about">About</Link>

      <Outlet />
    </div>
  );
};
export default LinkLayout;
