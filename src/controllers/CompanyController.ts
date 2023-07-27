import {Request, Response} from "express";

class CompanyController {
  /**
   * Create a new company
   */
  public static create = (req: Request, res: Response) => {
    const {authData} = req.body;
    console.log(authData);
  };
}

export default CompanyController;
