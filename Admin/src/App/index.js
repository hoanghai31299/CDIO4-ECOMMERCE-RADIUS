import React, { Suspense, useMemo, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";
import UserContext from "../Pages/UserContext";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

function App() {
  const [admin, setAdmin] = useState(undefined);
  const providerUser = useMemo(() => ({ admin, setAdmin }), [admin, setAdmin]);
  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  });

  return (
    <Aux>
      <ScrollToTop>
        <UserContext.Provider value={providerUser}>
          <Suspense fallback={<Loader />}>
            <Switch>
              {menu}
              <Route path="/" component={AdminLayout} />
            </Switch>
            <Redirect from="/dashboard/default" to="/auth/signin" />
          </Suspense>
        </UserContext.Provider>
      </ScrollToTop>
    </Aux>
  );
}

export default App;
