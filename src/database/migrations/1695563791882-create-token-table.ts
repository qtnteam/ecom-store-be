import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTokenTable1695563791882 implements MigrationInterface {
  name = 'CreateTokenTable1695563791882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tokens\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`access_token\` varchar(2000) NOT NULL,
        \`refresh_token\` varchar(2000) NOT NULL,
        \`access_token_expires_on\` datetime NOT NULL,
        \`refresh_token_expires_on\` datetime NOT NULL,
        \`user_id\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tokens\`
        ADD CONSTRAINT \`FK_8769073e38c365f315426554ca5\`
        FOREIGN KEY (\`user_id\`)
        REFERENCES \`users\`(\`id\`)
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tokens\` DROP FOREIGN KEY \`FK_8769073e38c365f315426554ca5\``,
    );
    await queryRunner.query(`DROP TABLE \`tokens\``);
  }
}
