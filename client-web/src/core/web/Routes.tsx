import * as React from "react";
import {RouteListItem} from "~/core/@types/RouteListItem";
import {FiAperture as FiApertureIcon} from "react-icons/fi";
// Layouts
import BlankLayout from "./components/layouts/Blank";

// Non-lazy pages
import {Error} from "./components/pages/Error";
import {Loading} from "./components/pages/Loading";
import {Loading as LoadingModule} from "./components/modules/Loading";
export {Error as ErrorPage, Loading as LoadingPage, LoadingModule};

//  Lazy Pages
const Index = React.lazy(() => import("./components/pages/Index"));
const Sitemap = React.lazy(() => import("./components/pages/Sitemap"));

export const Routes: {[key: string]: RouteListItem} = {
  CoreIndex: {name: `Core Index`, path: `/hookedjs`, layout: BlankLayout, view: Index, icon: FiApertureIcon},
  CoreError: {name: `Core Error`, path: `/hookedjs/error`, layout: BlankLayout, view: Error as any, icon: FiApertureIcon},
  CoreLoading: {name: `Core Loading`, path: `/hookedjs/loading`, layout: BlankLayout, view: Loading as any, icon: FiApertureIcon},
  Sitemap: {name: `Sitemap`, path: `/sitemap`, layout: BlankLayout, view: Sitemap as any, icon: FiApertureIcon},
};
