// var mixpanel = require('mixpanel-browser');
import mixpanel from "mixpanel-browser";
import {MixpanelTag} from "src/config";

mixpanel.init(MixpanelTag);

// Set Last Touch UTM Tags
function getQueryParam(url, param) {
  // Expects a raw URL
  param = param.replace(/[[]/, "[").replace(/[]]/, "]");
  var regexS = "[?&]" + param + "=([^&#]*)",
    regex = new RegExp(regexS),
    results = regex.exec(url);
  if (results === null || (results && typeof results[1] !== "string" && results[1].length)) {
    return "";
  } else {
    return decodeURIComponent(results[1]).replace(/\W/gi, " ");
  }
}
function campaignParams() {
  var campaign_keywords = "utm_source utm_medium utm_campaign utm_content utm_term".split(" "),
    kw = "",
    params = {},
    first_params = {};
  var index;
  for (index = 0; index < campaign_keywords.length; ++index) {
    kw = getQueryParam(document.URL, campaign_keywords[index]);
    if (kw.length) {
      params[campaign_keywords[index] + " [last touch]"] = kw;
    }
  }
  for (index = 0; index < campaign_keywords.length; ++index) {
    kw = getQueryParam(document.URL, campaign_keywords[index]);
    if (kw.length) {
      first_params[campaign_keywords[index] + " [first touch]"] = kw;
    }
  }
  mixpanel.people.set(params);
  mixpanel.people.set_once(first_params);
  mixpanel.register(params);
}
if (typeof document !== "undefined") campaignParams();

// export const Mixpanel = mixpanel
export const Mixpanel = mixpanel;
