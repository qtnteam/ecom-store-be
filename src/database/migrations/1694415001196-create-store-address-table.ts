// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStoreAddressTable1694415001196
  implements MigrationInterface
{
  name = 'CreateStoreAddressTable1694415001196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`store-addresses\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`store_id\` varchar(255) NOT NULL,
        \`address\` varchar(255) NOT NULL,
        \`type\` tinyint UNSIGNED NOT NULL DEFAULT '1',
        INDEX \`IDX_3163fabd1dc51598d5a689f7a0\` (\`address\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB COLLATE utf8mb4_general_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`store-addresses\` ADD CONSTRAINT \`FK_eb8f4c90d2ce2846308a3ad39d8\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`store-addresses\` DROP FOREIGN KEY \`FK_eb8f4c90d2ce2846308a3ad39d8\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3163fabd1dc51598d5a689f7a0\` ON \`store-addresses\``,
    );
    await queryRunner.query(`DROP TABLE \`store-addresses\``);
  }
}
