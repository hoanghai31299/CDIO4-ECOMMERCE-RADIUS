import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routers from "./router.js";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <Router>
      <div className="main">
        <Header />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
