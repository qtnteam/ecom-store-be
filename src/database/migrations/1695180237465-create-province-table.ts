// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProvinceTable1695180237465 implements MigrationInterface {
  name = 'CreateProvinceTable1695180237465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`provinces\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`code\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`slug\` varchar(255) NOT NULL,
        \`type\` varchar(255) NOT NULL,
        INDEX \`IDX_5c78199072262966fb68b71809\` (\`name\`),
        UNIQUE INDEX \`IDX_f4b684af62d5cb3aa174f6b9b8\` (\`code\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_f4b684af62d5cb3aa174f6b9b8\` ON \`provinces\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5c78199072262966fb68b71809\` ON \`provinces\``,
    );
    await queryRunner.query(`DROP TABLE \`provinces\``);
  }
}
