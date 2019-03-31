import {RouteListItem} from "~/core/@types/RouteListItem";

export const AppName = "HookedJS";
export const WebDomain = "hookedjs.com";

import Logo from "~/static/logo-white.svg";
export {Logo, Logo as LogoWhite};

export {JssTheme} from "~/themes/semantic/src/JssTheme";

export {LoadingModule, LoadingPage, ErrorPage} from "~/themes/semantic/src/Routes";

import {Routes as CoreRoutes} from "~/core/web/Routes";
import {Routes as SemanticRoutes} from "~/themes/semantic/src/Routes";
export const Routes: {[key: string]: RouteListItem} = {
  ...CoreRoutes,
  ...SemanticRoutes,
};

export const MixpanelTag = window.location.hostname === WebDomain ? "" : "";
export const GoogleAnalyticsTag = window.location.hostname === WebDomain ? "" : "";

export const IpgeolocationioKey = "b411927ec4954792905331b2dee8cb7b";
