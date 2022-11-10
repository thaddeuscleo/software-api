import { ObjectType, Field } from '@nestjs/graphql';
import { Software } from 'src/softwares/entities/software.entity';

@ObjectType()
export class Room {
  @Field(() => String, { description: 'Room identifier In UUID' })
  id?: string;

  @Field(() => String, { description: 'Room Number' })
  roomNumber: string;

  @Field(() => [Software], { description: 'Room softwares' })
  software: Software;
}