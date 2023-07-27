import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../services/auth.service";
import {ERRORS} from "../constants";

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
      message: ERRORS.AUTH_TOKEN_REQUIRED,
    });

  // Verify the token
  const verify = await verifyToken(authorization);

  if (!verify.status || !verify.data)
    return res.status(401).json({
      status: false,
      message: ERRORS.INVALID_AUTH_TOKEN,
    });

  req.body.userEmail = verify.data.email;

  next();
  return;
};
