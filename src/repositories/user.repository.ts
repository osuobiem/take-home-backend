import {PrismaClient} from "@prisma/client";
import {UserFilter} from "./types";

const prisma = new PrismaClient().user;

/**
 * Get user
 */
const read = async (filter: UserFilter) => {
  return await prisma.findUnique({
    where: {...filter},
    include: {
      company: true,
      role: true,
    },
  });
};

/**
 * Get users
 */
const readMany = async () => {
  return await prisma.findMany({
    include: {
      company: true,
      role: true,
    },
  });
};

export default {
  read,
  readMany,
};
