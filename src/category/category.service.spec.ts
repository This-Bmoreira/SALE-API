import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { countProductMock } from '../product/__mocks__/count-product.mock';
import { productMock } from '../product/__mocks__/product.mock';
import { ProductService } from '../product/product.service';
import { ReturnCategory } from './DTO/return-category.dto';
import { categoryMock } from './__mocks__/category.mock';
import { createCategoryMock } from './__mocks__/create-category.mock';
import { updateCategoryMock } from './__mocks__/update-category.mock';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: ProductService,
          useValue: {
            countProductByCategoryId: jest
              .fn()
              .mockResolvedValue([countProductMock]),
          },
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(categoryMock),
            find: jest.fn(),
            findOne: jest.fn().mockResolvedValue(categoryMock),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    productService = module.get<ProductService>(ProductService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(categoryRepository).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('read categories', () => {
    it('should return a list of categories', async () => {
      jest.spyOn(categoryRepository, 'find').mockResolvedValue([categoryMock]);
      const [categories] = await categoryService.getAllCategories();
      expect(categories).toEqual(
        new ReturnCategory(categoryMock, countProductMock.total),
      );
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
  describe('delete categories', () => {
    it('should sand realation in request find Onde', async () => {
      jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValue({ ...categoryMock, products: [productMock] });

      expect(
        categoryService.deleteCategory(categoryMock.id),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('editCategory categories', () => {
    it('should  return category in updadte category', async () => {
      const spy = jest.spyOn(categoryRepository, 'findOne');
      const result = await categoryService.editCategory(
        categoryMock.id,
        updateCategoryMock,
      );
      expect(result).toEqual(categoryMock);
      expect(spy.mock.calls.length > 0).toEqual(true);
    });
    it('should send new category to save', async () => {
      const spy = jest.spyOn(categoryRepository, 'save');
      await categoryService.editCategory(categoryMock.id, updateCategoryMock);
      expect(spy).toBeCalledWith({
        ...categoryMock,
        ...updateCategoryMock,
      });
    });
  });
});
