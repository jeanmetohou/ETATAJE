-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Demandeur', 'Conducteur', 'ChefParc', 'ChefService', 'ChefDivision');

-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('Mission', 'SortiePonctuelle');

-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('Disponible', 'Maintenance', 'Mission', 'SortiePonctuelle', 'MiseADisposition');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "fullname" VARCHAR(255),
    "email" VARCHAR(255),
    "role" "UserRole",
    "directionId" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Direction" (
    "directionId" TEXT NOT NULL,
    "acronym" VARCHAR(15),
    "name" VARCHAR(255),
    "leaderId" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Direction_pkey" PRIMARY KEY ("directionId")
);

-- CreateTable
CREATE TABLE "Car" (
    "carId" TEXT NOT NULL,
    "type" "CarType",
    "brand" VARCHAR(255),
    "licensePlate" VARCHAR(255),
    "location" TEXT[],
    "kilometer" INTEGER,
    "status" "CarStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("carId")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseId" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3),
    "returnDate" TIMESTAMP(3),
    "objet" VARCHAR(255),
    "destination" VARCHAR(255),
    "requester" VARCHAR(255),
    "requesterTitle" VARCHAR(255),
    "itinerary" VARCHAR(255),
    "courseUserId" TEXT,
    "driverId" TEXT,
    "carId" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "Direction"("directionId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direction" ADD CONSTRAINT "Direction_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseUserId_fkey" FOREIGN KEY ("courseUserId") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE NO ACTION ON UPDATE CASCADE;
