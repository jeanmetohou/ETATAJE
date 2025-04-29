/*
  Warnings:

  - You are about to drop the column `requester` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "requester",
ADD COLUMN     "requesterId" TEXT;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE CASCADE;
