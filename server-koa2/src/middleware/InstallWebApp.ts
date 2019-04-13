var Proxy = require("koa-proxy");
// const Rewrite = require("koa-rewrite");
const StaticServer = require("koa-static-server");

export const InstallWebApp = (app) => {
  if (process.env.NODE_ENV === "production") {
    // Install static web app
    // app.use(Rewrite('/*', '/'));
    app.use(StaticServer({rootDir: `${__dirname}/../../../../client-web/build`, notFoundFile: "index.html"}));
  } else {
    // Install dev server
    app.use(
      Proxy({
        host: `http://localhost:3001`,
      })
    );
  }
};
