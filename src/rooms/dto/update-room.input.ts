import { CreateRoomInput } from './create-room.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Software } from 'src/softwares/entities/software.entity';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field(() => String, { description: 'Room identifier In UUID' })
  id: string;

  @Field(() => String, { description: 'Room Number', nullable: true })
  roomNumber: string;

  @Field(() => [String], { description: 'Room softwares Id', nullable: true })
  softwares: string[];
}
