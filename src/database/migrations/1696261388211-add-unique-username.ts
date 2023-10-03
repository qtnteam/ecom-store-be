import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueUsername1696261388211 implements MigrationInterface {
  name = 'AddUniqueUsername1696261388211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\``,
    );
  }
}
