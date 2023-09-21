import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserStore1694446745346 implements MigrationInterface {
  name = 'CreateTableUserStore1694446745346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`username\` varchar(255) NOT NULL,
        \`phone_number\` varchar(12) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        UNIQUE INDEX \`IDX_17d1817f241f10a3dbafb169fd\` (\`phone_number\`),
        UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_17d1817f241f10a3dbafb169fd\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
