import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";
import { Link, Redirect } from "react-router-dom";

const Navbar = ({ history }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { currentUser, setCurrentUser } = useContext(UserContext);

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
      <div>
        <h1>Social Media App</h1>
      </div>

      {loggedIn && (
        <div>
          <ul>
            <li>
              <Link to={`/profile/${currentUser.username}`}>Your Profile</Link>
            </li>
          </ul>

          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
