// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1693294264151 implements MigrationInterface {
  name = 'CreateUserTable1693294264151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (
        \`id\` varchar(36) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
