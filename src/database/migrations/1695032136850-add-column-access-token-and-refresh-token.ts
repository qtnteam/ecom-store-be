import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnAccessTokenAndRefreshToken1695032136850
  implements MigrationInterface
{
  name = 'AddColumnAccessTokenAndRefreshToken1695032136850';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`access_token\` varchar(2000) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`refresh_token\` varchar(2000) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`refresh_token\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`access_token\``,
    );
  }
}
