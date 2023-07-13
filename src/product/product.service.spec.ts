import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { categoryMock } from '../category/__mocks__/category.mock';
import { CategoryService } from '../category/category.service';
import { createProductMock } from './__mocks__/create-product.mock';
import { productMock } from './__mocks__/product.mock';
import { returnDeleteMock } from './__mocks__/return-delete.mock';
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
            delete: jest.fn(),
            findOne: jest.fn(),
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
    it('should return a list of products', async () => {
      jest.spyOn(productRepository, 'find').mockResolvedValue([productMock]);
      const result = await productService.getAllProduct();
      expect(result).toEqual([productMock]);
    });

    it('should throw a NotFoundException when no products are found', async () => {
      jest.spyOn(productRepository, 'find').mockResolvedValue([]);
      await expect(productService.getAllProduct()).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw an error when an unexpected error occurs', async () => {
      jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
      await expect(productService.getAllProduct()).rejects.toThrow();
    });
    it('should return the product when a valid id is provided', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(productMock);
      const { id } = productMock;
      const result = await productService.findProductById(id);
      expect(result).toBe(productMock);
    });

    it('should throw a NotFoundException when an invalid id is provided', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);
      const { id } = productMock;
      await expect(productService.findProductById(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('create Product', () => {
    it('should return a product when inserted into the database', async () => {
      jest.spyOn(productRepository, 'save').mockResolvedValue(productMock);

      const result = await productService.createProduct(createProductMock);
      expect(result).toEqual(productMock);
    });

    it('should throw an error when an unexpected error occurs in finding the category', async () => {
      jest
        .spyOn(categoryService, 'findCategoryById')
        .mockRejectedValue(new Error());

      await expect(
        productService.createProduct(createProductMock),
      ).rejects.toThrow();
    });
  });

  describe('Delete Product', () => {
    it('should successfully delete the product from the database', async () => {
      jest
        .spyOn(productService, 'findProductById')
        .mockResolvedValue(productMock);
      jest
        .spyOn(productRepository, 'delete')
        .mockResolvedValue(returnDeleteMock);

      const { id } = productMock;
      const result = await productService.deleteProduct(id);
      expect(result).toEqual(returnDeleteMock);
    });
  });
});
