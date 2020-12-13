import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
const signup = {
  path: "/signup",
  component: Signup,
  exact: true,
};
const signin = {
  path: "/signin",
  component: Signin,
  exact: true,
};

export default {
  signup,
  signin,
};
