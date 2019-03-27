import {RouteListItem} from "~/core/Router";
import {Routes as SemanticRoutes, DemoRoutes as SemanticDemoRoutes} from "~/themes/semantic-child/src/Routes";

export const AppRoutes: {[key: string]: RouteListItem} = {
  Login: {...SemanticDemoRoutes.SemanticLoginDemo, path: `/login`},
  Register: {...SemanticDemoRoutes.SemanticRegisterDemo, path: `/register`},
  Lock: {...SemanticDemoRoutes.SemanticLockDemo, path: `/lock`},
  UserProfile: {...SemanticDemoRoutes.SemanticUserProfileDemo, path: `/user/profile`},
  Home: {...SemanticDemoRoutes.SemanticDashboardDemo, path: `/`},
  Dashboard: {...SemanticDemoRoutes.SemanticDashboardDemo, path: `/dashboard`},
  Posts: {...SemanticRoutes.Posts, path: `/posts`},
};

export const AdminRoutes: {[key: string]: RouteListItem} = {
  // {path: "/admin", layout: SidebarLayout, view: Dashboard}
};

export const DemoRoutes = SemanticRoutes;

export const Routes: {[key: string]: RouteListItem} = {
  ...SemanticDemoRoutes,
  ...SemanticRoutes,
  ...AppRoutes,
  ...AdminRoutes,
};
