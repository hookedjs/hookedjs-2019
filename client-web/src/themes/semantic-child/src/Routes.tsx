import * as React from "react";
import {RouteListItem} from "~/core/@types/RouteListItem";

// Icons
import {FiAperture as FiApertureIcon} from "react-icons/fi";

import {Routes as ParentRoutes} from "@semantic/Routes";
export {ErrorPage, LoadingModule, LoadingPage} from "@semantic/Routes";

// Layouts
// import BlankLayout from "@semantic/components/layouts/Blank";
import SidebarLayout from "@semantic/components/layouts/Sidebar";

const Index = React.lazy(() => import("./components/pages/Index"));

export const Routes: {[key: string]: RouteListItem} = {
  ...ParentRoutes,
  Home: {name: `Home`, path: `/`, layout: SidebarLayout, view: Index, icon: FiApertureIcon},
};
