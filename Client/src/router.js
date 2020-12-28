import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import Service from "./Components/Service/Service";
import Returns from "./Components/Returns/Returns";
import Shipping from "./Components/Shipping/Shipping";
import Faq from "./Components/Faq/Faq";
import Terms from "./Components/Terms/Terms";
import Product_guide from "./Components/Product_guide/Product_guide";
console.log(Service);
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
  {
    path: "/return",
    component: Returns,
    exact: true,
  },
  {
    path: "/shipping",
    component: Shipping,
    exact: true,
  },
  {
    path: "/faq",
    component: Faq,
    exact: true,
  },
  {
    path: "/product_guide",
    component: Product_guide,
    exact: true,
  },
  {
    path: "/terms",
    component: Terms,
    exact: true,
  },
];
export default routers;
