/*
  Warnings:

  - You are about to drop the column `deleted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "score" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deleted",
ADD COLUMN     "deleted_at" TIMESTAMP(3);
