import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
const routers = [
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
