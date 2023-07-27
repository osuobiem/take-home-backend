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
const read = async (id: string) => {
  return await prisma.findUniqueOrThrow({
    where: {id: parseInt(id)},
  });
};

/**
 * Update company
 */
const update = async (id: string, data: CompanyCreateOrUpdate) => {
  return await prisma.update({where: {id: parseInt(id)}, data});
};

export default {
  create,
  read,
  update,
};
