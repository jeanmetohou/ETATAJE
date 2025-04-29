/*
  Warnings:

  - You are about to drop the `EtatContentieuxAjt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EtatContentieuxAjt";

-- CreateTable
CREATE TABLE "Etat" (
    "etatId" TEXT NOT NULL,
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

    CONSTRAINT "Etat_pkey" PRIMARY KEY ("etatId")
);
