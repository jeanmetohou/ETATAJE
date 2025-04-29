-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('Disponible', 'EnCourse');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "driverStatus" "DriverStatus";
