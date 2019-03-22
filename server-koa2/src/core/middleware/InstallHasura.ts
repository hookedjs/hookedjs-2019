import * as Koa from "koa";
const Mount = require("koa-mount");
var Proxy = require("koa-proxy");

export const InstallHasura = (app) => {
  const hasura = new Koa();
  hasura.use(
    Proxy({
      host: process.env.HASURA_URL,
    })
  );
  app.use(Mount("/hasura", hasura));

  // Support and redirect /hasur url because Hasura likes to redirect and chop off the 'a' for unknown reasons.
  app.use(async (ctx, next) => {
    if (ctx.request.path.startsWith("/hasur/")) {
      console.log("Found it");
      ctx.redirect(ctx.request.path.replace("/hasur/", "/hasura/"));
    } else await next();
  });
  app.use(Mount("/hasur", hasura));
};
