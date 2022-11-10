import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CreateSoftwareInput } from './dto/create-software.input';
import { UpdateSoftwareInput } from './dto/update-software.input';

@Injectable()
export class SoftwaresService {
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
          create: [...input.rooms.map((room) => <{ roomId }>{ roomId: room })],
        },
      },
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

  async update(id: string, input: UpdateSoftwareInput) {
    try {
      return await this.prisma.software.update({
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
            connectOrCreate: [
              ...input.rooms.map(
                (roomId) =>
                  <Prisma.SoftwaresOnRoomsCreateOrConnectWithoutSoftwareInput>{
                    where: {
                      softwareId_roomId: {
                        roomId,
                        softwareId: id,
                      },
                    },
                    create: {
                      roomId,
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
      await this.prisma.softwaresOnRooms.deleteMany({
        where: {
          softwareId: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new GraphQLError(error.message);
      }
      throw new GraphQLError('Unknown Error');
    }

    try {
      return await this.prisma.software.delete({
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

  async getRooms(software: string) {
    return await this.prisma.room.findMany({
      where: {
        softwares: {
          some: {
            softwareId: software,
          },
        },
      },
    });
  }
}
