/*
  Warnings:

  - A unique constraint covering the columns `[contact]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "DriverDocumentType" ADD VALUE 'IMAGE';

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "contact" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Driver_contact_key" ON "Driver"("contact");
