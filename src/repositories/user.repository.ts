import {PrismaClient} from "@prisma/client";
import {UserFilter} from "./types";

const prisma = new PrismaClient().user;

/**
 * Get user
 */
const read = async (filter: UserFilter) => {
  return await prisma.findUniqueOrThrow({
    where: {...filter},
    include: {
      company: true,
    },
  });
};

export default {
  read,
};
