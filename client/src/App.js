import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useMemo } from "react";

// Context
import { UserContext, PostContext, AuthContext } from "./Context";

// Screens
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Register from "./screens/Register";

// Components
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: "",
  });

  const [posts, setPosts] = useState([]);

  const [authMessage, setAuthMessage] = useState("")

  const authValue = useMemo(
    () => ({authMessage, setAuthMessage}),
    [authMessage, setAuthMessage]
  )

  const userValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );
  const postValue = useMemo(
    () => ({ posts, setPosts }), 
    [posts, setPosts]);

  return (
    <Router>
      <div className="App">
        <main>
          <UserContext.Provider value={userValue}>
            <PostContext.Provider value={postValue}>
              <Route path="/" component={Navbar} />
              <AuthContext.Provider value={authValue}>
                <Route exact path="/login" component={Login} />
                <Route exact path='/register' component={Register} />
              </AuthContext.Provider>
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile/:username" component={Profile} />
            </PostContext.Provider>
          </UserContext.Provider>
        </main>
      </div>
    </Router>
  );
}

export default App;
