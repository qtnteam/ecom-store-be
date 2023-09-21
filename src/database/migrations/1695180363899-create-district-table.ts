// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDistrictTable1695180363899 implements MigrationInterface {
  name = 'CreateDistrictTable1695180363899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`districts\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`province_id\` varchar(255) NOT NULL,
        \`code\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`slug\` varchar(255) NOT NULL,
        \`type\` varchar(255) NOT NULL,
        INDEX \`IDX_6a6fd6d258022e5576afbad90b\` (\`name\`),
        UNIQUE INDEX \`IDX_8e9d73424149b43b38244f7552\` (\`code\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`districts\` 
        ADD CONSTRAINT \`FK_9d451638507b11822dc411a2dfe\` 
        FOREIGN KEY (\`province_id\`) 
        REFERENCES \`provinces\`(\`code\`) 
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`districts\` DROP FOREIGN KEY \`FK_9d451638507b11822dc411a2dfe\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8e9d73424149b43b38244f7552\` ON \`districts\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6a6fd6d258022e5576afbad90b\` ON \`districts\``,
    );
    await queryRunner.query(`DROP TABLE \`districts\``);
  }
}
