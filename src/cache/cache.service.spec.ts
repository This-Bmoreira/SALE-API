import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../user/__mocks__/user-entity.mock';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let cacheService: CacheService;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue(userEntityMock),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    cacheService = module.get<CacheService>(CacheService);
    cacheManager = module.get<any>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(cacheService).toBeDefined();
  });

  describe('getCache method', () => {
    it('should return data from cache', async () => {
      const user = await cacheService.getCache('key', () => null);

      expect(user).toEqual(userEntityMock);
    });

    it('should return data from function', async () => {
      const result = { test: 'tes' };
      jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined);

      const user = await cacheService.getCache('key', () =>
        Promise.resolve(result),
      );

      expect(user).toEqual(result);
    });
  });
});
