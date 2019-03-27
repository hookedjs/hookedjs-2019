import {RouteListItem} from "~/core/@types/RouteListItem";

export const AppName = "VestedInU";
export const WebDomain = "vestedinu.com";

import Logo from "~/static/logo-white.svg";
export {Logo, Logo as LogoWhite};

export {JssTheme} from "~/themes/semantic-child/src/JssTheme";

export {LoadingModule, LoadingPage, ErrorPage} from "~/themes/semantic-child/src/Routes";

import {Routes as CoreRoutes} from "~/core/web/Routes";
import {Routes as SemanticChildRoutes} from "~/themes/semantic-child/src/Routes";
export const Routes: {[key: string]: RouteListItem} = {
  ...CoreRoutes,
  ...SemanticChildRoutes,
};

export const GoogleAnalyticsTags = {
  web: "",
  native: "",
};

export const IpgeolocationioKey = "b411927ec4954792905331b2dee8cb7b";
