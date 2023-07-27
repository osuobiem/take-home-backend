import {Request, Response} from "express";
import userRepository from "../repositories/user.repository";

class UserController {
  /**
   * Get users
   */
  public static readMany = async (req: Request, res: Response) => {
    const users = await userRepository.readMany();

    return res.json(users);
  };
}

export default UserController;
