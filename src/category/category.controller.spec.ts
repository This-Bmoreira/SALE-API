import { Test, TestingModule } from '@nestjs/testing';
import { returnDeleteMock } from '../product/__mocks__/return-delete.mock';
import { categoryMock } from './__mocks__/category.mock';
import { createCategoryMock } from './__mocks__/create-category.mock';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getAllCategories: jest.fn().mockResolvedValue([categoryMock]),
            createCategory: jest.fn().mockResolvedValue(categoryMock),
            deleteCategory: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
      controllers: [CategoryController],
    }).compile();

    categoryController = app.get<CategoryController>(CategoryController);
    categoryService = app.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  describe('findAllCategories method', () => {
    it('should return Category entity ', async () => {
      const resolve = await categoryController.findAllCategories();

      expect(resolve).toEqual([categoryMock]);
    });
  });

  describe('createCategory method', () => {
    it('should return Category entity ', async () => {
      const resolve = await categoryController.createCategory(
        createCategoryMock,
      );

      expect(resolve).toEqual(categoryMock);
    });
  });
  describe('deleteCategory method', () => {
    it('should return DeleteResult  ', async () => {
      const resolve = await categoryController.deleteCategory(categoryMock.id);
      expect(resolve).toEqual(returnDeleteMock);
    });
    it('should send categoryId to deleteCategory   ', async () => {
      const spy = jest.spyOn(categoryService, 'deleteCategory');
      await categoryController.deleteCategory(categoryMock.id);
      expect(spy).toBeCalledWith(categoryMock.id);
    });
  });
});
