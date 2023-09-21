// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWardTable1695180542451 implements MigrationInterface {
  name = 'CreateWardTable1695180542451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`wards\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`district_id\` varchar(255) NOT NULL,
        \`code\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`slug\` varchar(255) NOT NULL,
        \`type\` varchar(255) NOT NULL,
        INDEX \`IDX_5a722ad2f076304832fa3d80af\` (\`name\`),
        UNIQUE INDEX \`IDX_24f16d2207b1dcb6ce07d81d20\` (\`code\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wards\` 
        ADD CONSTRAINT \`FK_3d1ef92876a28d10ac2d3fe766b\` 
        FOREIGN KEY (\`district_id\`) 
        REFERENCES \`districts\`(\`code\`) 
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`wards\` DROP FOREIGN KEY \`FK_3d1ef92876a28d10ac2d3fe766b\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_24f16d2207b1dcb6ce07d81d20\` ON \`wards\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5a722ad2f076304832fa3d80af\` ON \`wards\``,
    );
    await queryRunner.query(`DROP TABLE \`wards\``);
  }
}
