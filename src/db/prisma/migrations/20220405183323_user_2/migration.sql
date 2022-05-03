-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_username_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "username" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
