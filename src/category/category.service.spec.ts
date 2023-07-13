import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { categoryMock } from './__mocks__/category.mock';
import { createCategoryMock } from './__mocks__/create-category.mock';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(categoryMock),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(categoryRepository).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  describe('read categories', () => {
    it('should return a list of categories', async () => {
      jest.spyOn(categoryRepository, 'find').mockResolvedValue([categoryMock]);
      const categories = await categoryService.getAllCategories();
      expect(categories).toEqual([categoryMock]);
    });

    it('should throw a NotFoundException when no categories are found', async () => {
      jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);
      const result = categoryService.getAllCategories();
      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it('should throw an error when an unexpected error occurs', async () => {
      jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());
      const result = categoryService.getAllCategories();
      await expect(result).rejects.toThrow();
    });

    it('should return a category when searching by name', async () => {
      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(categoryMock);
      const { name } = categoryMock;
      const result = await categoryService.findCategoryByName(name);
      expect(result).toEqual(categoryMock);
    });

    it('should throw a NotFoundException when no category is found by name', async () => {
      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
      const { name } = categoryMock;
      const result = categoryService.findCategoryByName(name);
      await expect(result).rejects.toThrowError(NotFoundException);
    });
    it('should throw a NotFoundException when no category is found by id', async () => {
      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
      const { id } = categoryMock;
      try {
        await categoryService.findCategoryById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return the category when found by id', async () => {
      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(categoryMock);
      const { id } = categoryMock;
      const result = await categoryService.findCategoryById(id);
      expect(result).toEqual(categoryMock);
    });
  });

  describe('create categories', () => {
    it('should return the created category', async () => {
      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
      const category = await categoryService.createCategory(createCategoryMock);
      expect(category).toEqual(categoryMock);
    });

    it('should throw a BadRequestException when a category with the same name already exists', async () => {
      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(categoryMock);
      const category = categoryService.createCategory(createCategoryMock);
      await expect(category).rejects.toThrowError(BadRequestException);
    });

    it('should throw an error when an unexpected error occurs', async () => {
      jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());
      const result = categoryService.createCategory(createCategoryMock);
      await expect(result).rejects.toThrow();
    });
  });
});
