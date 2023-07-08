import { ReturnStateDTO } from '../../state/DTO/return-state.dto';
import { CityEntity } from '../entity/city.entity';

export class ReturnCityDTO {
  name: string;
  state: ReturnStateDTO;
  constructor({ name, state }: CityEntity) {
    this.name = name;
    this.state = state ? new ReturnStateDTO(state) : undefined;
  }
}
