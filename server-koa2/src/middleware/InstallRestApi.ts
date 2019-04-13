const glob = require( 'glob' );
import * as path from "path";
import * as Koa from "koa";
const Mount = require("koa-mount");

export const InstallRestApi = (app: Koa) => {
  const apiPath = path.resolve(__dirname, "../../api");

  const api = new Koa();
  // Include all route files in api
  glob.sync(apiPath + "/**/routes/*.ts").forEach((file: string) => {
    require(path.resolve(file)).default(api);
  });

  app.use(Mount("/api", api));
};
