import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import Service from "./Components/Service/Service";
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
  {
    path: "/service",
    component: Service,
    exact: true,
  },
];
export default routers;
