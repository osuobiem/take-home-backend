import {Router} from "express";
import CompanyController from "./controllers/CompanyController";
import {verifyAuthToken} from "./middlewares/auth.middleware";
import companyValidator from "./validators/company.validator";

const router = Router();

// Create company
router.post(
  "/company",
  verifyAuthToken,
  companyValidator.create,
  CompanyController.create
);

// Update company information
router.put(
  "/company/:id",
  verifyAuthToken,
  companyValidator.update,
  CompanyController.update
);

export default router;
