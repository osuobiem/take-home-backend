import {User} from "@prisma/client";

const users: User[] = [
  {
    id: 1,
    name: "User A",
    email: "usera@gmail.com",
    roleId: 1,
  },
  {
    id: 2,
    name: "User B",
    email: "userb@gmail.com",
    roleId: 1,
  },
  {
    id: 3,
    name: "User C",
    email: "userc@gmail.com",
    roleId: 2,
  },
];

export default users;
