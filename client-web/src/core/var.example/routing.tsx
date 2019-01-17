import { RouteListItem } from "~/core/Router";
import {Routes as BubblyRoutes, DemoRoutes as BubblyDemoRoutes} from "~/themes/bubbly-child/src/var/routing";

export const AppRoutes: {[key: string]: RouteListItem} = {
  Login: {...BubblyDemoRoutes.BubblyLoginDemo, path:`/login`},
  Register: {...BubblyDemoRoutes.BubblyRegisterDemo, path:`/register`},
  Lock: {...BubblyDemoRoutes.BubblyLockDemo, path:`/lock`},
  UserProfile: {...BubblyDemoRoutes.BubblyUserProfileDemo, path:`/user/profile`},
  Home: {...BubblyDemoRoutes.BubblyDashboardDemo, path:`/`},
  Dashboard: {...BubblyDemoRoutes.BubblyDashboardDemo, path:`/dashboard`},
  Posts: {...BubblyRoutes.Posts, path:`/posts`},
};

export const AdminRoutes: {[key: string]: RouteListItem} = {
  // {path: "/admin", layout: SidebarLayout, view: Dashboard}
};

export const DemoRoutes = BubblyRoutes;

export const Routes: {[key: string]: RouteListItem} = {
  ...BubblyDemoRoutes,
  ...BubblyRoutes,
  ...AppRoutes,
  ...AdminRoutes,
};
