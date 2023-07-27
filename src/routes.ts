import {verifyAuthToken} from "./middlewares/auth.middleware";
import {Route} from "./types";

const routes: Route[] = [
  {
    path: "/",
    method: "get",
    handler: (req, res, next) => {
      verifyAuthToken(req, res, next);
      () => {
        return res.send("Welcome");
      };
    },
  },
];

export default routes;
