/*
  Warnings:

  - You are about to drop the column `masterId` on the `Software` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Software" DROP CONSTRAINT "Software_masterId_fkey";

-- AlterTable
ALTER TABLE "Software" DROP COLUMN "masterId";

-- CreateTable
CREATE TABLE "_MasterToSoftware" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MasterToSoftware_AB_unique" ON "_MasterToSoftware"("A", "B");

-- CreateIndex
CREATE INDEX "_MasterToSoftware_B_index" ON "_MasterToSoftware"("B");

-- AddForeignKey
ALTER TABLE "_MasterToSoftware" ADD CONSTRAINT "_MasterToSoftware_A_fkey" FOREIGN KEY ("A") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterToSoftware" ADD CONSTRAINT "_MasterToSoftware_B_fkey" FOREIGN KEY ("B") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;
