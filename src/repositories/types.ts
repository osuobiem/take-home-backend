import {Company} from "@prisma/client";

export type UserFilter =
  | {
      email: string;
    }
  | {
      id: number;
    };

export type CompanyCreateOrUpdate = Omit<Company, "id" | "logo">;
