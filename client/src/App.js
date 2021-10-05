import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import { UserContext, PostContext } from "./Context";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";

import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: "",
  });

  // Get request will be made after successful login, posts will be accessable on user profiles
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "admin",
      content: "this is the first post",
    },
  ]);

  const userValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );
  const postValue = useMemo(() => ({ posts, setPosts }), [posts, setPosts]);

  return (
    <Router>
      <div className="App">
        <main>
          <UserContext.Provider value={userValue}>
            <PostContext.Provider value={postValue}>
              <Route path="/" component={Navbar} />
              {/* '/home' path should be protected */}
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile/:username" component={Profile} />
            </PostContext.Provider>
          </UserContext.Provider>
        </main>
      </div>
    </Router>
  );
}

export default App;
