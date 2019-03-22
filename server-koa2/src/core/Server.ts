import * as http from "http";
import * as Koa from "koa";
import * as pg from "pg";
import {InstallWatchFixtures, SanitiseEnv} from "~/core/Utils";
import {InstallStandardKoaMiddlewares} from "~/core/middleware/InstallStandardKoaMiddlewares";
import {InstallSession} from "~/core/middleware/InstallSession";
import {InstallPassport} from "~/core/middleware/InstallPassport";
import {InstallHasura} from "~/core/middleware/InstallHasura";
import {InstallWebApp} from "~/core/middleware/InstallWebApp";

export const Server = () => {
  SanitiseEnv();

  const rootPgPool = new pg.Pool({
    connectionString: process.env.ROOT_DATABASE_URL,
  });

  const isDev = process.env.NODE_ENV === "development";

  // We're using a non-super-user connection string, so we need to install the
  // watch fixtures ourself.
  if (isDev) {
    InstallWatchFixtures(rootPgPool);
  }

  const app = new Koa();
  const server = http.createServer(app.callback());

  InstallStandardKoaMiddlewares(app);
  InstallSession(app);
  InstallPassport(app, {rootPgPool});
  InstallHasura(app);
  InstallWebApp(app);

  const PORT = process.env.PORT;
  server.listen(PORT);
  console.log(`Listening on port ${PORT}`);
};
