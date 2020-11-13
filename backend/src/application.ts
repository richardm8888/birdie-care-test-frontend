import * as express from "express";
import {pingController} from "./controllers/ping";
import {visitsController} from "./controllers/visits";

var cors = require('cors')

const app = express();
// Enable cross-site requests (for the purposes of this test / development)
app.use(cors())

app.use(pingController);
app.use(visitsController);

export default app;
