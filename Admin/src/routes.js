import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Pages/Dashboard/Default"));

const UIBasicButton = React.lazy(() =>
  import("./Pages/UIElements/Basic/Button")
);
const UIBasicBadges = React.lazy(() =>
  import("./Pages/UIElements/Basic/Badges")
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
  import("./Pages/UIElements/Basic/BreadcrumbPagination")
);

const UIBasicCollapse = React.lazy(() =>
  import("./Pages/UIElements/Basic/Collapse")
);
const UIBasicTabsPills = React.lazy(() =>
  import("./Pages/UIElements/Basic/TabsPills")
);
const UIBasicBasicTypography = React.lazy(() =>
  import("./Pages/UIElements/Basic/Typography")
);

const FormsElements = React.lazy(() => import("./Pages/Forms/FormsElements"));

const BootstrapTable = React.lazy(() =>
  import("./Pages/Tables/BootstrapTable")
);

const Nvd3Chart = React.lazy(() => import("./Pages/Charts/Nvd3Chart/index"));

const OtherSamplePage = React.lazy(() => import("./Pages/Other/SamplePage"));
const OtherDocs = React.lazy(() => import("./Pages/Other/Docs"));
const Category = React.lazy(() => import("./Pages/Category"));
const Colors = React.lazy(() => import("./Pages/Colors"));
const Products = React.lazy(() => import("./Pages/Product"));
const Notifications = React.lazy(() =>
  import("./Pages/Notification/Notification")
);
const Coupons = React.lazy(() => import("./Pages/Coupon"));
const routes = [
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
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
  {
    path: "/basic/button",
    exact: true,
    name: "Basic Button",
    component: UIBasicButton,
  },
  {
    path: "/basic/badges",
    exact: true,
    name: "Basic Badges",
    component: UIBasicBadges,
  },
  {
    path: "/basic/breadcrumb-paging",
    exact: true,
    name: "Basic Breadcrumb Pagination",
    component: UIBasicBreadcrumbPagination,
  },
  {
    path: "/basic/collapse",
    exact: true,
    name: "Basic Collapse",
    component: UIBasicCollapse,
  },
  {
    path: "/basic/tabs-pills",
    exact: true,
    name: "Basic Tabs & Pills",
    component: UIBasicTabsPills,
  },
  {
    path: "/basic/typography",
    exact: true,
    name: "Basic Typography",
    component: UIBasicBasicTypography,
  },
  {
    path: "/forms/form-basic",
    exact: true,
    name: "Forms Elements",
    component: FormsElements,
  },
  {
    path: "/tables/bootstrap",
    exact: true,
    name: "Bootstrap Table",
    component: BootstrapTable,
  },
  {
    path: "/charts/nvd3",
    exact: true,
    name: "Nvd3 Chart",
    component: Nvd3Chart,
  },
  {
    path: "/sample-page",
    exact: true,
    name: "Sample Page",
    component: OtherSamplePage,
  },
  { path: "/docs", exact: true, name: "Documentation", component: OtherDocs },
];

export default routes;
