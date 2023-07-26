import {Role} from "@prisma/client";
import {PERMISSIONS} from "../../src/enums";

const roles: Role[] = [
  {
    id: 1,
    name: "User",
    description:
      "Can create, modify, and view own company data except for company logo",
    roles: [
      PERMISSIONS.CREATE_COMPANY.toString(),
      PERMISSIONS.UPDATE_COMPANY.toString(),
      PERMISSIONS.VIEW_COMPANY.toString(),
    ],
  },
  {
    id: 2,
    name: "Admin",
    description:
      "Can view users, modify companies logos, and compare companies",
    roles: [
      PERMISSIONS.UPDATE_COMPANY_LOGO.toString(),
      PERMISSIONS.VIEW_USERS.toString(),
      PERMISSIONS.COMPARE_COMPANIES.toString(),
    ],
  },
];

export default roles;
