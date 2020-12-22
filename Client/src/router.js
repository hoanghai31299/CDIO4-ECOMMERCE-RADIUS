import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import HomePage from "./Components/HomePage/HomePage";
const routers = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/signup",
    component: Signup,
    exact: true,
  },
  {
    path: "/signin",
    component: Signin,
    exact: true,
  },
];
export default routers;
