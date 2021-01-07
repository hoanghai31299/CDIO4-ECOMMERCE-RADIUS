import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import ContactUs from "./Components/ContactUs/ContactUs";
import HomePage from "./Components/HomePage/HomePage";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import AccountDetail from "./Components/AccountDetail/AccountDetail";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Card from "./Components/Card/Card";
import Product from "./Components/Product/Product";
import Checkout from "./Components/Checkout/Checkout";
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
  {
    path: "/forgotpassword",
    component: ForgotPassword,
    exact: true,
  },
  {
    path: "/account-detail",
    component: AccountDetail,
    exact: true,
  },
  {
    path: "/product-detail/:idProduct",
    component: ProductDetail,
    exact: true,
  },
  {
    path: "/cart",
    component: Card,
    exact: true,
  },
  {
    path: "/contact-us",
    component: ContactUs,
    exact: true,
  },
  {
    path: "/product/:category",
    component: Product,
    exact: true,
  },
  {
    path: "/checkout",
    component: Checkout,
    exact: true,
  },
];
export default routers;
