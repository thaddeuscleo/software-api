import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field(() => String, {
    description: 'Room Id',
    nullable: true,
    defaultValue: '',
  })
  id?: string;

  @Field(() => String, { description: 'Room Number' })
  roomNumber: string;

  @Field(() => [String], {
    description: 'Room softwares Id',
    nullable: true,
    defaultValue: [],
  })
  softwares?: string[];
}
