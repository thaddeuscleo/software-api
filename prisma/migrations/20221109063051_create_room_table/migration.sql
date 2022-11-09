-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "roomNUmber" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
