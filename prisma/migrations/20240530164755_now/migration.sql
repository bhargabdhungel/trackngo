-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "fuelCost" INTEGER,
ADD COLUMN     "otherCost" INTEGER,
ALTER COLUMN "fare" DROP NOT NULL,
ALTER COLUMN "maintenanceCost" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");
