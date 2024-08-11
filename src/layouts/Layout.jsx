import { Link, Outlet } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import "./Layout.css";

const Layout = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <div>
      <div className="linkLayoutContainer">
        <div className="pagesContainer">
          <FontAwesomeIcon icon={faUser} className="userIcon" />
          <div className="pagesLinks">
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
        </div>
        <div className="loginContainer">
          {token ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
