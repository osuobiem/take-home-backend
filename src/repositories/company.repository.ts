import {PrismaClient} from "@prisma/client";
import {CompanyCreate} from "./types";

const prisma = new PrismaClient().company;

/**
 * Create company
 */
const create = async (data: CompanyCreate) => {
  return await prisma.create({data});
};

export default {
  create,
};
