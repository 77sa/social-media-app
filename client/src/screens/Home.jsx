import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context";

const Home = ({ history }) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [history]);

  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div>
      <h2>Hi {currentUser}</h2>
    </div>
  );
};

export default Home;
