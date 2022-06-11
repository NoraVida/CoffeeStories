/*eslint-disable*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../helper/AuthContext';
import '../scss/Navbar.scss';

export default function Navbar() {
  const { loggedInUser, setLoggedInUser } = useAuthContext();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <>
      <nav>
        <Link to="/" className="logo ps-5">
          KávéSztorik
        </Link>
        <ul className={`nav-links ${navbarOpen ? "nav-active" : null}`}>
          {loggedInUser?.userId ? (
            <li>
              <Link to="/" className="nav-link">
                {loggedInUser.name}
              </Link>
            </li>
          ) : (
            <></>
          )}
          <li>
            <Link to="/coffees" className="nav-link">
              Kávék
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              Az oldalról
            </Link>
          </li>
          {loggedInUser?.userId ? (
            <li>
              <Link
                to="/"
                className="nav-link"
                onClick={() => {
                  setLoggedInUser({});
                  localStorage.removeItem('coffeeStoriesToken');
                }}
              >
                Kijelentkezés
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-link">
                Bejelentkezés
              </Link>
            </li>
          )}
        </ul>
        <div className="burger" onClick={handleToggle}>
          <div className="line1" />
          <div className="line2" />
          <div className="line3" />
        </div>
      </nav>
    </>
  );
}
