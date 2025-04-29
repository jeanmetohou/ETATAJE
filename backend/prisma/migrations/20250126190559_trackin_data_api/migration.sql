/*
  Warnings:

  - You are about to drop the column `averageSpeed` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId,itinerary]` on the table `CourseLocation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "averageSpeed",
DROP COLUMN "location",
ADD COLUMN     "ignition" BOOLEAN;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "distance" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "kmDeparture" INTEGER DEFAULT 0,
ADD COLUMN     "kmReturned" INTEGER DEFAULT 0,
ALTER COLUMN "itinerary" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CourseLocation" ADD COLUMN     "averageSpeed" DOUBLE PRECISION,
ADD COLUMN     "itinerary" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "CourseLocation_courseId_itinerary_key" ON "CourseLocation"("courseId", "itinerary");
