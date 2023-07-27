import {Company} from "@prisma/client";

export type UserFilter =
  | {
      email: string;
    }
  | {
      id: number;
    };

export type CompanyCreate = Omit<Company, "id" | "logo">;
