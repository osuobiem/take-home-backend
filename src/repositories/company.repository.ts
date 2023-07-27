import {PrismaClient} from "@prisma/client";
import {CompanyCreateOrUpdate} from "./types";

const prisma = new PrismaClient().company;

/**
 * Create company
 */
const create = async (data: CompanyCreateOrUpdate) => {
  return await prisma.create({data});
};

/**
 * Get company
 */
const read = async (id: number) => {
  return await prisma.findUniqueOrThrow({
    where: {id},
    include: {
      user: true,
    },
  });
};

/**
 * Update company
 */
const update = async (id: number, data: CompanyCreateOrUpdate) => {
  return await prisma.update({where: {id}, data});
};

export default {
  create,
  read,
  update,
};
