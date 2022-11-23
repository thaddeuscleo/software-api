import { CreateRoomInput } from './create-room.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field(() => String, { description: 'Room identifier In UUID' })
  id: string;

  @Field(() => String, { description: 'Room Number', nullable: true })
  roomNumber: string;

  @Field(() => [String], { description: 'Room softwares Id', nullable: true })
  softwares: string[];
}
