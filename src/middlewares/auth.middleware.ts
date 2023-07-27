import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../services/auth.service";

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {authorization} = req.headers;

  // Check if token is in the request header
  if (!authorization)
    return res.status(499).json({
      status: false,
      message: "Auth token required",
    });

  // Verify the token
  const verify = await verifyToken(authorization);

  if (!verify.status)
    return res.status(401).json({
      status: false,
      message: "Invalid auth token",
    });

  next();
  return;
};
