/*
  Warnings:

  - You are about to drop the column `averageSpeed` on the `CourseLocation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CourseLocation" DROP COLUMN "averageSpeed",
ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
