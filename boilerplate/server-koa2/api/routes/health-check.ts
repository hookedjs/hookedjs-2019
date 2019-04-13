import * as path from "path";
import * as Koa from "koa";
import * as Route from "koa-route";

const routePath = "/" + path.basename(__filename).split('.ts').shift();

export default (app: Koa) => {
  app.use(Route.get(routePath, async (ctx) => {
    ctx.body = "OK";
  }));
};
