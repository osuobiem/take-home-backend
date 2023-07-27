import express, {Express} from "express";
import dotenv from "dotenv";
import routes from "./src/routes";

dotenv.config();

const app: Express = express();

app.use(express.json());

// Set routes
routes.forEach((route) => app[route.method](route.path, route.handler));

// Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
