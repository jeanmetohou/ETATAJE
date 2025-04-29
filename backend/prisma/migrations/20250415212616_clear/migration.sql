/*
  Warnings:

  - You are about to drop the column `directionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `driverStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Direction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Admin" AS ENUM ('yes', 'no');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_carId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_courseUserId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_requesterId_fkey";

-- DropForeignKey
ALTER TABLE "CourseLocation" DROP CONSTRAINT "CourseLocation_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Direction" DROP CONSTRAINT "Direction_leaderId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_directionId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "directionId",
DROP COLUMN "driverStatus",
DROP COLUMN "phoneNumber",
DROP COLUMN "role",
ADD COLUMN     "isAdmin" "Admin";

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "CourseLocation";

-- DropTable
DROP TABLE "Direction";

-- DropEnum
DROP TYPE "CarStatus";

-- DropEnum
DROP TYPE "CarType";

-- DropEnum
DROP TYPE "CourseStatus";

-- DropEnum
DROP TYPE "CourseType";

-- DropEnum
DROP TYPE "DriverStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "EtatContentieuxAjt" (
    "etatContentieuxAjtId" TEXT NOT NULL,
    "tribunalChambres" VARCHAR(255),
    "numeroDossier" VARCHAR(255),
    "nomEtQualiteDesPartiesConseil" VARCHAR(255),
    "objet" VARCHAR(255),
    "faitsEtProcedure" VARCHAR(255),
    "moyensDesParties" VARCHAR(255),
    "observations" VARCHAR(255),
    "nomDuDossier" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EtatContentieuxAjt_pkey" PRIMARY KEY ("etatContentieuxAjtId")
);
