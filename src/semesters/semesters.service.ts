import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CreateSemesterInput } from './dto/create-semester.input';
import { UpdateSemesterInput } from './dto/update-semester.input';

@Injectable()
export class SemestersService {
  constructor(private readonly prisma: PrismaService) {}

  create({ semesterName, isActive, softwares }: CreateSemesterInput) {
    return this.prisma.semester.create({
      data: {
        semesterName,
        isActive,
        softwares: {
          connect: [...softwares.map((id) => ({ id }))],
        },
      },
    });
  }

  findAll() {
    return this.prisma.semester.findMany({});
  }

  findOne(id: string) {
    return this.prisma.semester.findFirst({
      where: {
        id,
      },
    });
  }

  update({ id, semesterName, isActive, softwares }: UpdateSemesterInput) {
    return this.prisma.semester.update({
      data: {
        semesterName,
        isActive,
        softwares: {
          connect: [...softwares.map((id) => ({ id }))],
        },
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.semester.delete({
      where: {
        id,
      },
    });
  }

  getSoftwares(id: string) {
    return this.prisma.software.findMany({
      where: {
        semesterId: id
      }
    })
  }
}
