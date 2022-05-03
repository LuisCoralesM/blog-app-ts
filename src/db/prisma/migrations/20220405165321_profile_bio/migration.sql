/*
  Warnings:

  - You are about to drop the column `birth_date` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `bio` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "birth_date",
ADD COLUMN     "bio" TEXT NOT NULL;
