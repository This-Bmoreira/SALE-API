import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1690899868041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO public.category(
                
                name,
                created_at,
                updated_at
            )
            VALUES
                ('calça', '2023-08-01T00:00:00', '2023-08-01T00:00:00'),
                ('camiseta', '2023-08-01T00:00:00', '2023-08-01T00:00:00'),
                ('casaco', '2023-08-01T00:00:00', '2023-08-01T00:00:00');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this;
  }
}
