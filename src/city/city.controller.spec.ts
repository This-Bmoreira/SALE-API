import { Test, TestingModule } from '@nestjs/testing';
import { stateEntityList } from '../state/__mocks__/state-entity-list.mock';
import { cityMock } from './__mocks__/city.mock';
import { CityController } from './city.controller';
import { CityService } from './city.service';

describe('CityController', () => {
  let cityController: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CityService,
          useValue: {
            getAllCity: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
      controllers: [CityController],
    }).compile();

    cityController = app.get<CityController>(CityController);
    cityService = app.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(cityController).toBeDefined();
    expect(cityService).toBeDefined();
  });

  describe('getAllCity Method ', () => {
    it('should return city entity ', async () => {
      const city = await cityController.getAllCity(stateEntityList[0].id);
      expect(city).toBe(cityMock);
    });
  });
});
