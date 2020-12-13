import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import router from "./router.js";
function App() {
  return (
    <Router>
      <div className="main">
        <ul>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <Switch>
          <Route path={router.signin.path} exact={router.signin.exact}>
            <Signin />
          </Route>
          <Route path={router.signup.path} exact={router.signup.exact}>
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
