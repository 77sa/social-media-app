import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import { UserContext } from "./Context";

import Home from "./screens/Home";
import Login from "./screens/Login";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: ''
  })

  const userValue = useMemo(() => ({currentUser, setCurrentUser}), [currentUser, setCurrentUser])

  return (
    <Router>
      <div className="App">
        {/* navbar */}
        <main>
          <UserContext.Provider value={userValue}>
            <Switch>
              {/* '/' path should be protected */}
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profile" />
              <Route exact path="/profile/:id" />
            </Switch>
          </UserContext.Provider>
        </main>
      </div>
    </Router>
  );
}

export default App;
