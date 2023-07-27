import {NextFunction, Request, Response, Router} from "express";
import CompanyController from "./controllers/CompanyController";
import {verifyAuthToken} from "./middlewares/auth.middleware";
import companyValidator from "./validators/company.validator";
import {hasPermission} from "./middlewares/gate.middleware";
import {PERMISSIONS} from "./enums";
import UserController from "./controllers/UserController";

const router = Router();

// Create company
router.post(
  "/company",
  verifyAuthToken,
  companyValidator.create,
  (req: Request, res: Response, next: NextFunction) =>
    hasPermission(req, res, next, PERMISSIONS.CREATE_COMPANY),
  CompanyController.create
);

// Update company information
router.put(
  "/company/:id",
  verifyAuthToken,
  companyValidator.update,
  (req: Request, res: Response, next: NextFunction) =>
    hasPermission(req, res, next, PERMISSIONS.UPDATE_COMPANY),
  CompanyController.update
);

// Get company
router.get(
  "/company/:id",
  verifyAuthToken,
  (req: Request, res: Response, next: NextFunction) =>
    hasPermission(req, res, next, PERMISSIONS.VIEW_COMPANY),
  CompanyController.read
);

// Get users
router.get(
  "/user",
  verifyAuthToken,
  (req: Request, res: Response, next: NextFunction) =>
    hasPermission(req, res, next, PERMISSIONS.VIEW_USERS),
  UserController.readMany
);

export default router;
