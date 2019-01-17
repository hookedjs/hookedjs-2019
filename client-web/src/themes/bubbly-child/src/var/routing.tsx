import * as React from "react";
import { RouteListItem } from "~/core/Router";

import AppsIcon from "@material-ui/icons/Apps";

// Layouts
// import AuthLayout from "@bubbly/components/layouts/Auth/Auth";
import SidebarLayout from "@bubbly/components/layouts/Sidebar/Sidebar";

import {DemoRoutes as ParentDemoRoutes, Routes as ParentRoutes, ErrorComponent, LoadingComponent} from "@bubbly/var/routing";

// Normal Pages
const Posts = React.lazy(() => import("../components/pages/Posts/Posts"));

export {ErrorComponent, LoadingComponent};

export const DemoRoutes: {[key: string]: RouteListItem} = {
  ...ParentDemoRoutes,
};

export const Routes: {[key: string]: RouteListItem} = {
  ...ParentRoutes,
  Posts: {name: `Posts`, path: `/bubbly/posts`, layout: SidebarLayout, view: Posts, icon: AppsIcon},
};
