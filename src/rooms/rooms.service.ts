import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRoomInput) {
    return this.prisma.room.create({
      data,
    });
  }

  findAll() {
    return this.prisma.room.findMany();
  }

  findOne(id: string) {
    return this.prisma.room.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdateRoomInput) {
    return this.prisma.room.update({
      data,
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.room.delete({
      where: {
        id,
      },
    });
  }
}
