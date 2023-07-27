import {Router} from "express";
import CompanyController from "./controllers/CompanyController";
import {verifyAuthToken} from "./middlewares/auth.middleware";
import companyValidator from "./validators/company.validator";
import {checkCompany, hasPermission} from "./middlewares/gate.middleware";
import {PERMISSIONS} from "./enums";
import UserController from "./controllers/UserController";
import {uploadFile} from "./utils";

const router = Router();

const uploadLogoImage = uploadFile.single("logo");

// Create company
router.post(
  "/company",
  verifyAuthToken,
  companyValidator.create,
  (req, res, next) => hasPermission(req, res, next, PERMISSIONS.CREATE_COMPANY),
  CompanyController.create
);

// Update company information
router.put(
  "/company/:id",
  verifyAuthToken,
  companyValidator.update,
  (req, res, next) => hasPermission(req, res, next, PERMISSIONS.UPDATE_COMPANY),
  CompanyController.update
);

// Get company
router.get(
  "/company/:id",
  verifyAuthToken,
  (req, res, next) => hasPermission(req, res, next, PERMISSIONS.VIEW_COMPANY),
  CompanyController.read
);

// Get companies
router.get(
  "/company",
  verifyAuthToken,
  (req, res, next) => hasPermission(req, res, next, PERMISSIONS.VIEW_USERS),
  CompanyController.readMany
);

// Update company logo
router.patch(
  "/company/:id",
  verifyAuthToken,
  companyValidator.updateLogo,
  (req, res, next) =>
    hasPermission(req, res, next, PERMISSIONS.UPDATE_COMPANY_LOGO),
  checkCompany,
  (req, res) => {
    uploadLogoImage(req, res, (err) => {
      CompanyController.updateLogo(req, res, err);
    });
  }
);

// Get users
router.get(
  "/user",
  verifyAuthToken,
  (req, res, next) => hasPermission(req, res, next, PERMISSIONS.VIEW_USERS),
  UserController.readMany
);

export default router;
