import express, {Express} from "express";
import dotenv from "dotenv";
import routes from "./src/routes";
import bodyParser from "body-parser";
import {errors} from "celebrate";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(errors());

// Set routes
routes.forEach((route) => app[route.method](route.path, route.handler));

// Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
