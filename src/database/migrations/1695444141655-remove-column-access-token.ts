import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveColumnAccessToken1695444141655
  implements MigrationInterface
{
  name = 'RemoveColumnAccessToken1695444141655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`refresh_token\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`access_token\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`access_token\` varchar(2000) COLLATE "utf8mb4_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`refresh_token\` varchar(2000) COLLATE "utf8mb4_general_ci" NULL`,
    );
  }
}
