import {Company, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient().company;

/**
 * Create company
 */
export const create = async (data: Company) => {
  return await prisma.create({data});
};
