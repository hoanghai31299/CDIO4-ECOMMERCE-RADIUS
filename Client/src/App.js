import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routers from "./router.js";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import axios from "./axios";
import Error404 from "./Components/Error404";
function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    axios
      .get("/auth/signinW")
      .then((res) => {
        if (!res.data.error) setUser(res.data.user);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <Router>
      <div className="main">
        <Header user={user} />
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
          <Route component={Error404} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
