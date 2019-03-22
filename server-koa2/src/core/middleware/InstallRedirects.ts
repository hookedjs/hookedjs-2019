// Not currently in use

export const InstallRedirects = (app) => {
  // Example redirect
  app.use(async (ctx, next) => {
    if (ctx.request.path.startsWith("/hasur/")) ctx.redirect(ctx.request.path.replace("/hasur/", "/hasura/"));
    else await next();
  });
};
