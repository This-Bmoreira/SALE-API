import { Test, TestingModule } from '@nestjs/testing';
import { stateEntityList } from './__mocks__/state-entity-list.mock';
import { StateController } from './state.controller';
import { StateService } from './state.service';

describe('StateController', () => {
  let stateController: StateController;
  let stateService: StateService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StateService,
          useValue: {
            getAllState: jest.fn().mockResolvedValue(stateEntityList),
          },
        },
      ],
      controllers: [StateController],
    }).compile();

    stateController = app.get<StateController>(StateController);
    stateService = app.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(stateController).toBeDefined();
    expect(stateService).toBeDefined();
  });

  describe('getAllState method', () => {
    it('should return State entity ', async () => {
      const resolve = await stateController.getAllState();

      expect(resolve).toEqual(stateEntityList);
    });
  });
});
