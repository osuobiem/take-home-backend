import {Router} from "express";
import CompanyController from "./controllers/CompanyController";
import {verifyAuthToken} from "./middlewares/auth.middleware";

const router = Router();

// Create company
router.post("/company", verifyAuthToken, CompanyController.create);

export default router;
