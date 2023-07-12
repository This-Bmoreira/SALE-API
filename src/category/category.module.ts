import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheManager } from '../cache/cache.module';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './entity/category.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [CacheManager, TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
