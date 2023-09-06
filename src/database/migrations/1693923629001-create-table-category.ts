// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCategory1693923629001 implements MigrationInterface {
  name = 'CreateTableCategory1693923629001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`name\` varchar(255) NOT NULL,
        \`display_name\` varchar(255) NOT NULL,
        \`parent_id\` varchar(255) NULL,
        \`level\` tinyint UNSIGNED NOT NULL DEFAULT '1',
        \`slug\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_88cea2dc9c31951d06437879b40\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_88cea2dc9c31951d06437879b40\``,
    );
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
