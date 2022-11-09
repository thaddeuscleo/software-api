import { InputType, Int, Field,  } from '@nestjs/graphql';
import { Software } from 'src/softwares/entities/software.entity';

@InputType()
export class CreateRoomInput {
  @Field(() => String, { description: 'Room Number'})
  roomNumber: string;

  @Field(() => [String], { description: 'Room softwares Id', nullable: true })
  softwares: string[];
}
