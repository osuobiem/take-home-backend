/*
  Warnings:

  - You are about to drop the column `roles` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "roles",
ADD COLUMN     "permissions" TEXT[];
