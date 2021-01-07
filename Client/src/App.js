import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routers from "./router.js";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Error404 from "./Components/Error404";
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
                component={route.component}></Route>
            );
          })}
          <Route component={Error404} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
