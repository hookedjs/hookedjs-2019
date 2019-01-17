import * as React from "react";
import { hot, setConfig } from "react-hot-loader";

import { RegisterServerWorker } from "./RegisterServiceWorker";
import { Router } from "./Router";
import { HelmetDefault } from "./components/Helmet";

// Import config to pull in
import {AppName} from "~/var/config";

console.log(`HotApp: Starting ${AppName}`);

// Service Worker
RegisterServerWorker();

// HOt reload logging level and pureSFC makes hot reload play nice with hooks
// @ts-ignore: pureSFC isn't found for some reason
setConfig({ logLevel: "error", pureSFC: true });

const App = () => {
  return (
    <div className="app-container">
      <HelmetDefault />
      <Router />
    </div>
  );
};

export const HotApp = hot(module)(App);
