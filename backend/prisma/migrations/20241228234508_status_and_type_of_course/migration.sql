-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('created', 'Approved', 'Pendding', 'Started', 'EndCourse');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('Mission', 'SortiePonctuelle');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "courseStatus" "CourseStatus",
ADD COLUMN     "courseType" "CourseType";
