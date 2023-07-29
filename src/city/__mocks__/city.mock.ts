import { stateEntityList } from '../../state/__mocks__/state-entity-list.mock';
import { CityEntity } from '../entity/city.entity';

export const cityMock: CityEntity = {
  id: 3591,
  stateId: stateEntityList[0].id,
  name: 'Angra dos Reis',
  created_at: new Date(),
  updated_at: new Date(),
};
