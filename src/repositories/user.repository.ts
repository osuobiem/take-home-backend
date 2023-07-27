import {PrismaClient} from "@prisma/client";

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
