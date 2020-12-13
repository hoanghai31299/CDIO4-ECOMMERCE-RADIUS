import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import routers from "./router.js";
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
          {routers.map((route) => {
            return (
              <Route
                path={route.path}
                exact={route.exact}
                component={route.component}
              ></Route>
            );
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
