import express, {Express} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {errors} from "celebrate";
import router from "./src/router";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(errors());

// Set app router
app.use(router);

// Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
