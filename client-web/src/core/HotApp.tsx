import * as React from "react";
import {hot, setConfig} from "react-hot-loader";
import {ThemeProvider} from "react-jss";

import {RegisterServerWorker} from "./RegisterServiceWorker";
import {Router} from "./Router";
import {HelmetDefault} from "./web/components/modules/Helmet";

import {JssTheme} from "~/config";

// Import config to pull in
import {AppName} from "~/config";

console.log(`HotApp: Starting ${AppName}`);

// Service Worker
RegisterServerWorker();

// HOt reload logging level and pureSFC makes hot reload play nice with hooks
// @ts-ignore: pureSFC isn't found for some reason
setConfig({logLevel: "error", pureSFC: true});

const App = () => {
  return (
    <ThemeProvider theme={JssTheme}>
      <div className="app-container">
        <HelmetDefault />
        <Router />
      </div>
    </ThemeProvider>
  );
};

export const HotApp = hot(module)(App);
