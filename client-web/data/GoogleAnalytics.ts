import * as ReactGa from "react-ga";
import {GoogleAnalyticsTag} from "../../../../client-web/config";

ReactGa.initialize(GoogleAnalyticsTag);

export const GoogleAnalytics = ReactGa;
