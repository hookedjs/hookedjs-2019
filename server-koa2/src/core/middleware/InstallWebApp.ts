var Proxy = require("koa-proxy");
const Static = require("koa-static");

export const InstallWebApp = (app) => {
  if (process.env.NODE_ENV === "production") {
    // Install static web app
    app.use(Static(`${__dirname}/../../../../client-web/build`));
  } else {
    // Install dev server
    app.use(
      Proxy({
        host: `http://localhost:${process.env.WEB_DEV_PORT}`,
      })
    );
  }
};
