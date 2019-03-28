import * as ReactGa from "react-ga";

ReactGa.initialize(ENV.GOOGLE_ANALYTICS_ID);

export const GoogleAnalytics = ReactGa;
