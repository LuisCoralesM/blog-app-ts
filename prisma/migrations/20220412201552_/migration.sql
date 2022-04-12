/*
  Warnings:

  - You are about to drop the column `profile_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Made the column `profile_id` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_profile_id_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "profile_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_id";

-- CreateIndex
CREATE UNIQUE INDEX "Post_profile_id_key" ON "Post"("profile_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
