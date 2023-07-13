import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1688399112076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO public."user"(
                name, email, cpf, type_user, phone, password)
                VALUES ('root', 'root@gmail.com', '36297482012', 2, '90000-0000', '$2b$10$aC8DJtG2BEE4ZaVMKHyivuqNBiJC5XYdlow6CQKe5UFR7prg7HpYi');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public."user"
                WHERE email like 'root@gmail.com';
        `);
  }
}
