const session = require("koa-session");

export const InstallSession = (app) => {
  app.keys = [process.env.SECRET];
  app.use(session({}, app));
};
