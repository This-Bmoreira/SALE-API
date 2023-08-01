import { ApiProperty } from '@nestjs/swagger';
import { StateEntity } from '../entity/state.entity';

export class ReturnStateDTO {
  @ApiProperty({
    description: 'Um estado Brasileiro',
    example: 'Rio de janeiro',
  })
  name: string;
  constructor(state: StateEntity) {
    this.name = state.name;
  }
}
