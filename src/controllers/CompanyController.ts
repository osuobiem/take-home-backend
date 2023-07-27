import {Request, Response} from "express";
import {ERRORS} from "../constants";
import userRepository from "../repositories/user.repository";
import companyRepository from "../repositories/company.repository";

class CompanyController {
  /**
   * Create a new company
   */
  public static create = async (req: Request, res: Response) => {
    const {userEmail, name, numberOfUsers, numberOfProducts, percentage} =
      req.body;

    // Get user using auth email
    const user = await userRepository.read({email: userEmail});

    // Check if user has created a company in the past
    if (user.company) {
      return res.status(400).json({
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
    const {userEmail} = req.body;
    const {id} = req.params;

    // Get user using auth email
    await userRepository.read({email: userEmail});

    // Get company
    const company = await companyRepository.read(id);

    // Update company
    try {
      const data = {...req.body};
      delete data.userEmail;

      await companyRepository.update(id, {...company, ...data});

      return res
        .status(200)
        .json({status: true, message: "Company updated successfully"});
    } catch (error: any) {
      console.error("Error creating company:", error.message);

      return res.status(500).json({
        status: false,
        message: ERRORS.GENERIC,
      });
    }
  };
}

export default CompanyController;
