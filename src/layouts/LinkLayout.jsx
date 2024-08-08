import { Link, Outlet } from "react-router-dom";
import "./LinkLayout.css";
const LinkLayout = () => {
  return (
    <div>
      <div className="linkLayoutContainer">
        <div className="pagesContainer">
          <Link to="/" className="homeLink">
            Home
          </Link>
          <Link to="/about" className="aboutLink">
            About
          </Link>
          <Link to="/contact" className="contactLink">
            Contact
          </Link>
        </div>
        <div className="loginContainer">
          <Link to="/login">Login</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default LinkLayout;
