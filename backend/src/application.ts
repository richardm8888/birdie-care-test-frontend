import * as express from "express";
import {pingController} from "./controllers/ping";
import {visitsController} from "./controllers/visits";

const app = express();

app.use(pingController);
app.use(visitsController);

export default app;
