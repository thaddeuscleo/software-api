import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  create(input: CreateRoomInput) {
    try {
      return this.prisma.room.create({
        data: {
          masterId: input.masterId,
          id: input.id === '' ? undefined : input.id,
          roomNumber: input.roomNumber,
          softwares: {
            create: [
              ...input.softwares.map(
                (softwareId) => <{ softwareId }>{ softwareId },
              ),
            ],
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new GraphQLError(error.message);
      }
      throw new GraphQLError(error);
    }
  }

  findAll(skip?: number, take?: number) {
    return this.prisma.room.findMany({
      skip,
      take,
    });
  }

  findOne(id: string) {
    return this.prisma.room.findFirst({
      where: {
        id,
      },
    });
  }

  count() {
    return this.prisma.room.count();
  }

  update(id: string, input: UpdateRoomInput) {
    try {
      return this.prisma.room.update({
        data: {
          roomNumber: input.roomNumber,
          softwares: {
            connectOrCreate: [
              ...input.softwares.map(
                (softwareId) =>
                  <Prisma.SoftwaresOnRoomsCreateOrConnectWithoutRoomInput>{
                    where: {
                      softwareId_roomId: {
                        roomId: id,
                        softwareId,
                      },
                    },
                    create: {
                      softwareId,
                    },
                  },
              ),
            ],
          },
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new GraphQLError(error.message);
      }
      throw new GraphQLError('Unknown Error');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.room.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new GraphQLError(error.message);
      }
      throw new GraphQLError(error);
    }
  }

  async getSoftwares(roomId: string) {
    return await this.prisma.software.findMany({
      where: {
        rooms: {
          some: {
            roomId,
          },
        },
      },
    });
  }

  getMaster(id: string) {
    return this.prisma.master.findFirst({
      where: {
        rooms: {
          some: {
            id
          }
        }
      },
    });
  }
}
