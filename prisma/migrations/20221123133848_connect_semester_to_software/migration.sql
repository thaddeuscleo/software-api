/*
  Warnings:

  - Added the required column `semesterId` to the `Software` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Software" ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Software" ADD CONSTRAINT "Software_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
