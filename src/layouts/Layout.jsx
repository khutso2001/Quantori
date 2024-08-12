import { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import "./Layout.css";

const Layout = () => {
  const { token, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

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
          <FontAwesomeIcon
            icon={menuOpen ? faTimes : faBars}
            className="burgerIcon"
            onClick={toggleMenu}
          />
        </div>
      </div>

      <div className={`burgerMenu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="burgerLink" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/about" className="burgerLink" onClick={toggleMenu}>
          About
        </Link>
        <Link to="/contact" className="burgerLink" onClick={toggleMenu}>
          Contact
        </Link>
        {token ? (
          <button
            className="burgerButton"
            onClick={() => {
              logout();
              toggleMenu();
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="burgerLink" onClick={toggleMenu}>
            Login
          </Link>
        )}
      </div>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
