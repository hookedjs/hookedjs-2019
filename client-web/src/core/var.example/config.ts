import {DemoRoutes, Routes} from "~/var/routing";

// Import SCSS styles
import "~/themes/semantic-child/src/scss/main.scss?v=1.4.0";

export const AppName = "HookedJS";
export const WebDomain = "hookedjs.github.com";

export {Routes};

export {LoadingModule, ErrorComponent} from "~/themes/semantic-child/src/Routes";

export const HeaderLinks = [Routes.Register, Routes.Login, Routes.Lock];

export const SidebarNavLinks = [
  Routes.Dashboard,
  Routes.Posts,
  {
    path: "/semantic/demo/dashboard",
    name: "Demo",
    icon: Routes.SemanticTimelineDemo.icon,
    views: Object.values(DemoRoutes),
  },
];

export const GoogleAnalyticsTags = {
  web: "",
  native: "",
};

export const AlgoliaCreds = {
  applicationId: "",
  apiKey: "",
};

export const IpgeolocationioKey = "";
