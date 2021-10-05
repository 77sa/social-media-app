import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = ({ history }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    localStorage.getItem("token") ? setLoggedIn(true) : setLoggedIn(false);
  });

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/login");
  };

  return (
    <nav>
      <div className="logo">
        <h1>
          {loggedIn ? (
            <Link to="/home">Social Media App</Link>
          ) : (
            <p>Social Media App</p>
          )}
        </h1>
      </div>

      {loggedIn && (
        <div className="links">
          <ul>
            <li>
              <Link
                className="nav-profile"
                to={`/profile/${currentUser.username}`}
              >
                Your Profile
              </Link>
            </li>
          </ul>

          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
