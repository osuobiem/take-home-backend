import {NextFunction, Request, Response} from "express";
import {ERRORS} from "../constants";
import userRepository from "../repositories/user.repository";
import companyRepository from "../repositories/company.repository";
import {uploadFile} from "../utils";
import {unlinkSync} from "fs";

class CompanyController {
  /**
   * Create a new company
   */
  public static create = async (req: Request, res: Response) => {
    const {user, name, numberOfUsers, numberOfProducts, percentage} = req.body;

    // Check if user has created a company in the past
    if (user.company) {
      return res.status(403).json({
        status: false,
        message: `${ERRORS.ACTION_NOT_ALLOWED}: You've already created a company`,
      });
    }

    // Create company
    try {
      await companyRepository.create({
        name,
        numberOfProducts,
        numberOfUsers,
        percentage,
        userId: user.id,
      });

      return res
        .status(201)
        .json({status: true, message: "Company created successfully"});
    } catch (error: any) {
      console.error("Error creating company:", error.message);

      return res.status(500).json({
        status: false,
        message: ERRORS.GENERIC,
      });
    }
  };

  /**
   * Update company information
   */
  public static update = async (req: Request, res: Response) => {
    const {id} = req.params;

    // Get company
    const company = await companyRepository.read(id);

    if (!company || company === null) {
      return res.status(400).json({
        status: false,
        message: ERRORS.NOT_FOUND,
      });
    }

    // Update company
    try {
      const data = {...req.body};
      delete data.user;

      await companyRepository.update(id, {...company, ...data});

      return res.json({status: true, message: "Company updated successfully"});
    } catch (error: any) {
      console.error("Error updating company:", error.message);

      return res.status(500).json({
        status: false,
        message: ERRORS.GENERIC,
      });
    }
  };

  /**
   * Get company
   */
  public static read = async (req: Request, res: Response) => {
    const {id} = req.params;

    // Get company
    const company = await companyRepository.read(id);

    if (!company || company === null) {
      return res.status(400).json({
        status: false,
        message: ERRORS.NOT_FOUND,
      });
    }

    return res.json(company);
  };

  /**
   * Update company logo
   */
  public static updateLogo = async (req: Request, res: Response, err: any) => {
    const {id} = req.params;
    const company = await companyRepository.read(id);

    // Check if an error occurred or if file does not exist
    if (err || !req.file || !company || company === null) {
      return res.status(400).json({
        status: false,
        message: err?.message
          ? `Error updating logo: ${err.message}`
          : ERRORS.GENERIC,
      });
    } else {
      const fileName = req.file.filename;

      const oldLogo = company.logo;

      // Update company logo field
      try {
        await companyRepository.update(id, {...company, logo: fileName});

        // Delete old company logo file
        if (oldLogo && oldLogo !== null) {
          unlinkSync(`./public/uploads/${oldLogo}`);
        }

        return res.json({
          status: true,
          message: "Company logo updated successfully",
        });
      } catch (error: any) {
        console.error("Error updating company logo:", error.message);

        return res.status(500).json({
          status: false,
          message: ERRORS.GENERIC,
        });
      }
    }
  };

  /**
   * Get companies
   */
  public static readMany = async (req: Request, res: Response) => {
    const companies = await companyRepository.readMany();

    return res.json(companies);
  };
}

export default CompanyController;
