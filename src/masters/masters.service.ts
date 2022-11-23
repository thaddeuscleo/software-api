import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma-service/prisma.service';
import { CreateMasterInput } from './dto/create-master.input';
import { MasterFind } from './dto/master-find';
import { UpdateMasterInput } from './dto/update-master.input';

@Injectable()
export class MastersService {
  constructor(private readonly prisma: PrismaService) {}

  create({ masterName, rooms, softwares }: CreateMasterInput) {
    return this.prisma.master.create({
      data: {
        masterName,
        rooms: {
          connect: [...rooms.map<{ id: string }>((room) => ({ id: room }))],
        },
        software: {
          connect: [...softwares.map<{ id: string }>((room) => ({ id: room }))],
        },
      },
    });
  }

  findAll(find?: MasterFind, skip?: number, take?: number) {
    return this.prisma.master.findMany({
      skip,
      take,
      where: {
        masterName: {
          contains: find.masterName,
          mode: 'insensitive',
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.master.findFirst({
      where: {
        id,
      },
    });
  }

  update({ id, masterName, rooms, softwares }: UpdateMasterInput) {
    return this.prisma.master.update({
      where: {
        id,
      },
      data: {
        masterName,
        rooms: {
          connect: [...rooms.map<{ id: string }>((room) => ({ id: room }))],
        },
        software: {
          connect: [
            ...softwares.map<{ id: string }>((software) => ({ id: software })),
          ],
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.master.delete({
      where: {
        id,
      },
    });
  }
}
