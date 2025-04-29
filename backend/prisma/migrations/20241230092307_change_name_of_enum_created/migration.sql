/*
  Warnings:

  - The values [created] on the enum `CourseStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseStatus_new" AS ENUM ('Created', 'Approved', 'Pendding', 'Started', 'EndCourse');
ALTER TABLE "Course" ALTER COLUMN "courseStatus" TYPE "CourseStatus_new" USING ("courseStatus"::text::"CourseStatus_new");
ALTER TYPE "CourseStatus" RENAME TO "CourseStatus_old";
ALTER TYPE "CourseStatus_new" RENAME TO "CourseStatus";
DROP TYPE "CourseStatus_old";
COMMIT;
