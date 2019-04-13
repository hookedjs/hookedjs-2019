import * as ReactGa from "react-ga";
import {GoogleAnalyticsTag} from "@project/client-web/config";

ReactGa.initialize(GoogleAnalyticsTag);

export const GoogleAnalytics = ReactGa;
