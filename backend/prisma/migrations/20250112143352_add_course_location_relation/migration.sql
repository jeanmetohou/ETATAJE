-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "currentLatitude" DOUBLE PRECISION,
ADD COLUMN     "currentLongitude" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "CourseLocation" (
    "locationId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseLocation_pkey" PRIMARY KEY ("locationId")
);

-- AddForeignKey
ALTER TABLE "CourseLocation" ADD CONSTRAINT "CourseLocation_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE CASCADE ON UPDATE CASCADE;
