import * as React from "react";
import {RouteListItem} from "~/core/@types/RouteListItem";
import {FiAperture as FiApertureIcon} from "react-icons/fi";

// Layouts
// import BlankLayout from "~/core/web/components/layouts/Blank";
import SidebarLayout from "./components/layouts/Sidebar";

// Non-lazy pages
import {Error} from "./components/pages/Error";
import {Loading} from "./components/pages/Loading";
import {Loading as LoadingModule} from "./components/modules/Loading";
export {Error as ErrorPage, Loading as LoadingPage, LoadingModule};

//  Lazy Pages
const Index = React.lazy(() => import("./components/pages/Index"));
const Todos = React.lazy(() => import("./components/pages/Todos"));

export const Routes: {[key: string]: RouteListItem} = {
  Home: {name: `Semantic Theme Index`, path: `/`, layout: SidebarLayout, view: Index, icon: FiApertureIcon},
  SemanticError: {name: `Semantic Error`, path: `/semantic/error`, layout: SidebarLayout, view: Error as any, icon: FiApertureIcon},
  SemanticLoading: {name: `Semantic Loading`, path: `/semantic/loading`, layout: SidebarLayout, view: Loading as any, icon: FiApertureIcon},
  SemanticTodos: {name: `Semantic Todos Page`, path: `/semantic/todos`, layout: SidebarLayout, view: Todos, icon: FiApertureIcon},
};
