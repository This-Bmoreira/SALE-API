import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1690900249070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO public.product(
                
                category_id,
                name,
                price,
                image,
                weight,
                length,
                height,
                width,
                diameter
            )
            VALUES
                ( 3, 'Casaco de Inverno', 99, 'https://example.com/casaco-inverno.jpg', 1.2, 50, 60, 20, 0),
                ( 3, 'Casaco de Outono', 89, 'https://example.com/casaco-outono.jpg', 1.0, 45, 55, 18, 0),
                ( 3, 'Casaco de Primavera', 79, 'https://example.com/casaco-primavera.jpg', 0.9, 40, 50, 17, 0),
                ( 3, 'Casaco de Verão', 69, 'https://example.com/casaco-verao.jpg', 0.8, 35, 45, 15, 0),
                ( 1, 'Calça Jeans', 49, 'https://example.com/calca-jeans.jpg', 0.8, 30, 40, 15, 0),
                ( 1, 'Calça Preta', 39, 'https://example.com/calca-preta.jpg', 0.7, 28, 38, 13, 0),
                ( 1, 'Calça Legging', 34, 'https://example.com/calca-legging.jpg', 0.6, 25, 35, 11, 0),
                ( 1, 'Calça de Moletom', 44, 'https://example.com/calca-moletom.jpg', 0.9, 32, 42, 14, 0),
                ( 1, 'Calça Skinny', 54, 'https://example.com/calca-skinny.jpg', 0.7, 28, 38, 13, 0),
                ( 2, 'Camiseta Branca', 29, 'https://example.com/camiseta-branca.jpg', 0.5, 20, 30, 10, 5),
                ( 2, 'Camiseta Preta', 24, 'https://example.com/camiseta-preta.jpg', 0.4, 18, 28, 8, 4),
                ( 2, 'Camiseta Estampada', 34, 'https://example.com/camiseta-estampada.jpg', 0.6, 22, 32, 9, 3),
                ( 2, 'Camiseta Lisa', 27, 'https://example.com/camiseta-lisa.jpg', 0.5, 20, 30, 10, 5);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this;
  }
}
