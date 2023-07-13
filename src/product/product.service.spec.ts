import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { categoryMock } from '../category/__mocks__/category.mock';
import { CategoryService } from '../category/category.service';
import { createProductMock } from './__mocks__/create-product.mock';
import { productMock } from './__mocks__/product.mock';
import { ProductEntity } from './entity/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();
    productService = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });
  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('read product', () => {
    it('should return a list of product', async () => {
      jest.spyOn(productRepository, 'find').mockResolvedValue([productMock]);
      const result = await productService.getAllProduct();
      expect(result).toEqual([productMock]);
    });

    it('should throw a NotFoundException when no product are found', async () => {
      jest.spyOn(productRepository, 'find').mockResolvedValue([]);
      const result = productService.getAllProduct();
      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it('should throw an error when an unexpected error occurs', async () => {
      jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
      const result = productService.getAllProduct();
      await expect(result).rejects.toThrow();
    });
  });
  describe('create Product', () => {
    it('should return a product when insert  bd', async () => {
      jest.spyOn(productRepository, 'save').mockResolvedValue(productMock);

      const result = await productService.createProduct(createProductMock);
      expect(result).toEqual(productMock);
    });
    it('should return a product when insert  bd', async () => {
      jest
        .spyOn(categoryService, 'findCategoryById')
        .mockRejectedValue(new Error());

      const result = productService.createProduct(createProductMock);
      expect(result).rejects.toThrow();
    });
  });
});
