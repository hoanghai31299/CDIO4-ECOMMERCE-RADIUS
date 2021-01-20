import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Pages/Dashboard/Default"));

const Category = React.lazy(() => import("./Pages/Category"));
const Colors = React.lazy(() => import("./Pages/Colors"));
const Products = React.lazy(() => import("./Pages/Product"));
const Notifications = React.lazy(() =>
  import("./Pages/Notification/Notification")
);
const Coupons = React.lazy(() => import("./Pages/Coupon"));
const Users = React.lazy(() => import("./Pages/User"));
const Orders = React.lazy(() => import("./Pages/Order"));
const UpdateProduct = React.lazy(() => import("./Pages/Product/Update"));
const routes = [
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/views/orders",
    exact: true,
    name: "Order",
    component: Orders,
  },
  {
    path: "/update/product/:id",
    exact: true,
    name: "Update Product",
    component: UpdateProduct,
  },
  {
    path: "/views/coupons",
    exact: true,
    name: "Coupon",
    component: Coupons,
  },
  {
    path: "/views/colors",
    exact: true,
    name: "Colors",
    component: Colors,
  },
  {
    path: "/views/users",
    exact: true,
    name: "Users",
    component: Users,
  },
  {
    path: "/views/category",
    exact: true,
    name: "Category",
    component: Category,
  },
  {
    path: "/views/products",
    exact: true,
    name: "Products",
    component: Products,
  },
  {
    path: "/views/notifications",
    exact: true,
    name: "Notification",
    component: Notifications,
  },
];

export default routes;
