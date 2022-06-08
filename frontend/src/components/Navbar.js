import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../helper/AuthContext';
import '../scss/Navbar.scss';

export default function Navbar() {
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  return (
    <>
      <nav>
        <Link to="/" className="logo">
          KávéSztorik
        </Link>
        <ul className="nav-links">
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
      </nav>
    </>
  );
}
