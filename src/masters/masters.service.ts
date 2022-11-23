import { Injectable } from '@nestjs/common';
import { CreateMasterInput } from './dto/create-master.input';
import { UpdateMasterInput } from './dto/update-master.input';

@Injectable()
export class MastersService {
  create(createMasterInput: CreateMasterInput) {
    return 'This action adds a new master';
  }

  findAll() {
    return `This action returns all masters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} master`;
  }

  update(id: number, updateMasterInput: UpdateMasterInput) {
    return `This action updates a #${id} master`;
  }

  remove(id: number) {
    return `This action removes a #${id} master`;
  }
}
