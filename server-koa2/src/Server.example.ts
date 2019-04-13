import * as http from "http";
import * as Koa from "koa";
import * as pg from "pg";
import {SanitiseEnv} from "~/core/Utils";
import {InstallStandardKoaMiddlewares} from "~/core/middleware/InstallStandardKoaMiddlewares";
import {InstallSession} from "~/core/middleware/InstallSession";
import {InstallPassport} from "~/core/middleware/InstallPassport";
import {InstallHasura} from "~/core/middleware/InstallHasura";
import {InstallRestApi} from "~/core/middleware/InstallRestApi";
import {InstallWebApp} from "~/core/middleware/InstallWebApp";

SanitiseEnv();

const rootPgPool = new pg.Pool({
  connectionString: process.env.ROOT_DATABASE_URL,
});

const app = new Koa();
const server = http.createServer(app.callback());

InstallStandardKoaMiddlewares(app);
InstallSession(app);
InstallPassport(app, {rootPgPool});
InstallRestApi(app);
InstallHasura(app);
InstallWebApp(app);

server.listen(3000);
console.log(`Listening on port 3000);
