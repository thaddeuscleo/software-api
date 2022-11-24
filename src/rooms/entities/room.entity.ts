import { ObjectType, Field } from '@nestjs/graphql';
import { Master } from './../../masters/entities/master.entity';
import { Software } from '../../softwares/entities/software.entity';

@ObjectType()
export class Room {
  @Field(() => String, { description: 'Room identifier In UUID' })
  id?: string;

  @Field(() => String, { description: 'Room Number' })
  roomNumber: string;

  @Field(() => [Software], { description: 'Room softwares' })
  softwares: Software[];

  @Field(() => Master, { description: 'room master Type' })
  master: Master;
}
