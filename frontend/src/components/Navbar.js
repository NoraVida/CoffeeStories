import React from "react";
import { Link } from "react-router-dom";
import "../scss/Navbar.scss";

export default function Navbar() {
  return (
    <>
      <nav>
        <Link to="/" className="logo">KávéSztorik</Link>
        <ul className="nav-links">
          <li>
            <Link to="/coffees" className="nav-link">Kávék</Link>
          </li>
          <li>
            <Link to="/" className="nav-link">Rólunk</Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">Bejelentkezés</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
