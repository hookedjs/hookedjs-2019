export const AppName = "HookedJS";
export const WebDomain = "hookedjs.com";

export const MixpanelId = window.location.hostname === WebDomain ? "" : "";
export const GoogleAnalyticsId = window.location.hostname === WebDomain ? "" : "";

export const GoogleTagManagerTag = window.location.hostname === WebDomain
  ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=mamYSCocAP-ZZdjiRCQejA&gtm_preview=env-2&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-xxxxxxx');`
  : `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=ig4ihuJybxuHSwt-g276vQ&gtm_preview=env-5&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-xxxxxxx');`;

export const IpgeolocationioKey = "b411927ec4954792905331b2dee8cb7b";
