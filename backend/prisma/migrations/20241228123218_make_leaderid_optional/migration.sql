-- DropForeignKey
ALTER TABLE "Direction" DROP CONSTRAINT "Direction_leaderId_fkey";

-- AddForeignKey
ALTER TABLE "Direction" ADD CONSTRAINT "Direction_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
