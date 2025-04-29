/*
  Warnings:

  - You are about to drop the column `trakingCarId` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "trakingCarId",
ADD COLUMN     "trackingCarId" INTEGER;
