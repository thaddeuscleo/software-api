import { Injectable } from '@nestjs/common';
import { PrismaServiceService } from 'src/prisma-service/prisma-service.service';
import { CreateSoftwareInput } from './dto/create-software.input';
import { UpdateSoftwareInput } from './dto/update-software.input';

@Injectable()
export class SoftwaresService {
  constructor(private prisma: PrismaServiceService) {}

  create(data: CreateSoftwareInput) {
    return this.prisma.software.create({
      data,
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
}
