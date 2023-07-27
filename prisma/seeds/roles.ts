import {Role} from "@prisma/client";
import {PERMISSIONS} from "../../src/enums";

const roles: Role[] = [
  {
    id: 1,
    name: "User",
    description:
      "Can create, modify, and view own company data except for company logo",
    permissions: [
      PERMISSIONS.CREATE_COMPANY,
      PERMISSIONS.UPDATE_COMPANY,
      PERMISSIONS.VIEW_COMPANY,
    ],
  },
  {
    id: 2,
    name: "Admin",
    description:
      "Can view users, modify companies logos, and compare companies",
    permissions: [
      PERMISSIONS.UPDATE_COMPANY_LOGO,
      PERMISSIONS.VIEW_USERS,
      PERMISSIONS.COMPARE_COMPANIES,
    ],
  },
];

export default roles;
