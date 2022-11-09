-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_softwareId_fkey";

-- CreateTable
CREATE TABLE "SoftwaresOnRooms" (
    "softwareId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "SoftwaresOnRooms_pkey" PRIMARY KEY ("softwareId","roomId")
);

-- AddForeignKey
ALTER TABLE "SoftwaresOnRooms" ADD CONSTRAINT "SoftwaresOnRooms_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwaresOnRooms" ADD CONSTRAINT "SoftwaresOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
