import * as ReactGa from "react-ga";
import {GoogleAnalyticsTag} from "src/config";

ReactGa.initialize(GoogleAnalyticsTag);

export const GoogleAnalytics = ReactGa;
