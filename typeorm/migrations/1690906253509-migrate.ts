import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1690906253509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO public."user"(
                id, name, email, cpf, type_user, phone, password)
            VALUES
                (2, 'Bruno Moreira', 'bm@gmail.com', '341.321.333-32', 1, '90000-0000', '111111'),
                (3, 'Joe Doe', 'jd@gmail.com', '341.321.333-32', 1, '90000-0000', '111111'),
                (4, 'Maria Silva', 'maria@gmail.com', '123.456.789-00', 1, '98765-4321', '123456'),
                (5, 'João Santos', 'joao@gmail.com', '987.654.321-00', 1, '55555-5555', 'abcdef'),
                (6, 'Ana Oliveira', 'ana@gmail.com', '456.789.123-00', 1, '12345-6789', 'qwerty'),
                (7, 'Pedro Souza', 'pedro@gmail.com', '987.654.321-99', 1, '11111-222', 'password123'),
                (8, 'Carla Santos', 'carla@gmail.com', '123.456.789-99', 1, '33333-3333', 'test123'),
                (9, 'Pamela Santos', 'Pamela@gmail.com', '123.456.789-99', 1, '03333-3333', 'test123')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this;
  }
}
