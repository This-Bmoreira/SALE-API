import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { stateEntityList } from './__mocks__/state-entity-list.mock';
import { StateEntity } from './entity/state.entity';
import { StateService } from './state.service';

describe('userService', () => {
  let stateService: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(stateEntityList),
          },
        },
      ],
    }).compile();

    stateService = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', () => {
    expect(stateService).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  describe('Read State', () => {
    it('should retrieve all states when calling getAllState ', async () => {
      const result = await stateService.getAllState();
      expect(result).toEqual(stateEntityList);
    });
    it('should throw an error when there is a database error when calling getAllState', async () => {
      jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());
      expect(stateService.getAllState()).rejects.toThrowError();
    });
  });
});
