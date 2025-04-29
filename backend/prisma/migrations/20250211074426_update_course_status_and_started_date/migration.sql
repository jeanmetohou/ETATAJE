-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CourseStatus" ADD VALUE 'Stopped';
ALTER TYPE "CourseStatus" ADD VALUE 'InProgress';

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "startedDate" TIMESTAMP(3);
