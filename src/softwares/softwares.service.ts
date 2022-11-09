import { Injectable } from '@nestjs/common';
import { CreateSoftwareInput } from './dto/create-software.input';
import { UpdateSoftwareInput } from './dto/update-software.input';

@Injectable()
export class SoftwaresService {
  create(createSoftwareInput: CreateSoftwareInput) {
    return 'This action adds a new software';
  }

  findAll() {
    return `This action returns all softwares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} software`;
  }

  update(id: number, updateSoftwareInput: UpdateSoftwareInput) {
    return `This action updates a #${id} software`;
  }

  remove(id: number) {
    return `This action removes a #${id} software`;
  }
}
