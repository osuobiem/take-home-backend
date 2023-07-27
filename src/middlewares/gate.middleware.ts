import {NextFunction, Request, Response} from "express";
import {ERRORS} from "../constants";
import userRepository from "../repositories/user.repository";
import {PERMISSIONS} from "../enums";

export const hasPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
  permission: PERMISSIONS
) => {
  const {userEmail} = req.body;

  try {
    // Get user using auth email
    const user = await userRepository.read({email: userEmail});

    if (!user || user === null) {
      return res.status(500).json({
        status: false,
        message: ERRORS.GENERIC,
      });
    }

    // Check if user role has required permission
    if (user.role.permissions.includes(permission)) {
      req.body.user = user;
      delete req.body.userEmail;

      next();
      return;
    }

    return res.status(403).json({
      status: false,
      message: ERRORS.ACTION_NOT_ALLOWED,
    });
  } catch (error: any) {
    console.log("Error checking user permissions:", error.message);

    return res.status(500).json({
      status: false,
      message: ERRORS.GENERIC,
    });
  }
};
