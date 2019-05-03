import * as http from "http";
import * as Koa from "koa";
import * as pg from "pg";
import {SanitiseEnv} from "./Utils";
import {InstallStandardKoaMiddlewares} from "./middleware/InstallStandardKoaMiddlewares";
import {InstallSession} from "./middleware/InstallSession";
import {InstallPassport} from "./middleware/InstallPassport";
import {InstallRestApi} from "./middleware/InstallRestApi";
import {InstallWebApp} from "./middleware/InstallWebApp";

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
InstallWebApp(app);

server.listen(3000);
console.log(`Listening on port 3000`);
