-- DropForeignKey
ALTER TABLE "SoftwaresOnRooms" DROP CONSTRAINT "SoftwaresOnRooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "SoftwaresOnRooms" DROP CONSTRAINT "SoftwaresOnRooms_softwareId_fkey";

-- AddForeignKey
ALTER TABLE "SoftwaresOnRooms" ADD CONSTRAINT "SoftwaresOnRooms_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwaresOnRooms" ADD CONSTRAINT "SoftwaresOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
