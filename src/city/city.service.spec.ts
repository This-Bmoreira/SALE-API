import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { cityMock } from './__mocks__/city.mock';
import { CityService } from './city.service';
import { CityEntity } from './entity/city.entity';

describe('CityService', () => {
  let cityService: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    cityService = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(cityService).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  describe('read city', () => {
    it('should return the city with findOne', async () => {
      const { id } = cityMock;
      const city = await cityService.getCityById(id);
      expect(city).toEqual(cityMock);
    });
    it('should throw NotFoundException when city is not found', async () => {
      jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);
      const { id } = cityMock;
      const result = cityService.getCityById(id);
      expect(result).rejects.toThrowError();
    });
    it('should return an array of cities with getAllCity', async () => {
      const { id } = cityMock;
      const city = await cityService.getAllCity(id);

      expect(city).toEqual([cityMock]);
    });
  });
});
