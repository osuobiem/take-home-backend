import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import {ERRORS} from "../constants";

const prisma = new PrismaClient();

class CompanyController {
  /**
   * Create a new company
   */
  public static create = async (req: Request, res: Response) => {
    const {userEmail, name, numberOfUsers, numberOfProducts, percentage} =
      req.body;

    // Get user using auth email
    const user = await prisma.user.findUnique({
      where: {email: userEmail},
      include: {
        company: true,
      },
    });

    // Check if user with email exists
    if (!user || user === null) {
      return res.status(500).json({
        status: false,
        message: ERRORS.GENERIC,
      });
    }

    // Check if user has created a company in the past
    if (user.company) {
      return res.status(400).json({
        status: false,
        message: `${ERRORS.ACTION_NOT_ALLOWED}: You've already created a company`,
      });
    }

    // Create company
    try {
      await prisma.company.create({
        data: {
          name,
          numberOfProducts,
          numberOfUsers,
          percentage,
          userId: user.id,
        },
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
}

export default CompanyController;
