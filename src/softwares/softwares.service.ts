import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CreateRoomInput } from 'src/rooms/dto/create-room.input';
import { Room } from 'src/rooms/entities/room.entity';
import { CreateSoftwareInput } from './dto/create-software.input';
import { UpdateSoftwareInput } from './dto/update-software.input';

@Injectable()
export class SoftwaresService {

  private readonly logger = new Logger(SoftwaresService.name);


  constructor(private prisma: PrismaService) {}

  create(input: CreateSoftwareInput) {
    return this.prisma.software.create({
      data: {
        currentLicense: input.currentLicense,
        installerPath: input.installerPath,
        license: input.license,
        numberOfLicense: input.numberOfLicense,
        softwareName: input.softwareName,
        version: input.version,
        group: input.group,
        note: input.note,
        rooms: {
          create: [...input.rooms.map(room => <{roomId}>{roomId: room})]
        }
      }
    });
  }

  findAll() {
    return this.prisma.software.findMany();
  }

  findOne(id: string) {
    return this.prisma.software.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdateSoftwareInput) {
    return this.prisma.software.update({
      data,
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.software.delete({
      where: {
        id,
      },
    });
  }

  async getRooms(software: string) {
    return await this.prisma.room.findMany({
      where: {
        softwares: {
          some: {
            softwareId: software
          }
        }
      }
    }) 
  }
}
