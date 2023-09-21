import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableStore1694546745347 implements MigrationInterface {
  name = 'CreateTableStore1694546745347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`stores\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`user_id\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`identifier\` varchar(255) NOT NULL,
        \`thumbnail\` varchar(255) NULL,
        \`description\` varchar(1024) NOT NULL,
        INDEX \`IDX_3367aeed14d200757b88b9f6de\` (\`name\`, \`identifier\`),
        UNIQUE INDEX \`IDX_ad98b8815a66c29442fe90b0eb\` (\`identifier\`),
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`stores\` ADD CONSTRAINT \`FK_29f39971656b4bf7832b7476d10\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`stores\` DROP FOREIGN KEY \`FK_29f39971656b4bf7832b7476d10\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ad98b8815a66c29442fe90b0eb\` ON \`stores\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3367aeed14d200757b88b9f6de\` ON \`stores\``,
    );
    await queryRunner.query(`DROP TABLE \`stores\``);
  }
}
