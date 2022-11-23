import { ObjectType, Field } from '@nestjs/graphql';
import { Software } from './../../softwares/entities/software.entity';
import { Room } from './../../rooms/entities/room.entity';

@ObjectType()
export class Master {
  @Field(() => String, { description: 'Master ID' })
  id: string;

  @Field(() => String, { description: 'Master Name' })
  masterName: string;

  @Field(() => [Room], { description: 'Master Name' })
  rooms: Room[];

  @Field(() => Software, { description: 'Master Name' })
  softwares: Software[];
}
