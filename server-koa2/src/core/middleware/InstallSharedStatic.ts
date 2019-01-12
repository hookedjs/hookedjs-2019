const koaStatic = require("koa-static");

export const InstallSharedStatic = (app) => {
  app.use(koaStatic(`${__dirname}/../../public`));
};
