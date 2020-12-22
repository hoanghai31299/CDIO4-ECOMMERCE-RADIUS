import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import ContactUs from "./Components/ContactUs/ContactUs";
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
    path: "/contact-us",
    component: ContactUs,
    exact: true,
  }
];
export default routers;
