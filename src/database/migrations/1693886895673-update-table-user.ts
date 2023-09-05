// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableUser1693886895673 implements MigrationInterface {
  name = 'UpdateTableUser1693886895673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`deleted_at\` datetime(0) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deleted_at\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
  }
}
