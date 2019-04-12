export const AppName = "HookedJS";
export const WebDomain = "hookedjs.com";

import Logo from "~/static/logo-white.svg";
export {Logo, Logo as LogoWhite};

export const MixpanelTag = window.location.hostname === WebDomain ? "" : "";
export const GoogleAnalyticsTag = window.location.hostname === WebDomain ? "" : "";

export const IpgeolocationioKey = "b411927ec4954792905331b2dee8cb7b";
