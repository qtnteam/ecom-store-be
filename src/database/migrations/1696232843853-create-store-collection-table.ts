import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStoreCollectionTable1696232843853
  implements MigrationInterface
{
  name = 'CreateStoreCollectionTable1696232843853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`store-collections\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`name\` varchar(255) NOT NULL,
        \`thumbnail\` varchar(2000) NULL,
        \`status\` tinyint UNSIGNED NOT NULL DEFAULT '0',
        \`index\` int NOT NULL DEFAULT '0',
        \`store_id\` varchar(255) NOT NULL,
        INDEX \`IDX_861cb26c826f680c0065c50933\` (\`name\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`store-collections\` ADD CONSTRAINT \`FK_83c8926f0d9d8ae90affb85c4d0\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`store-collections\` DROP FOREIGN KEY \`FK_83c8926f0d9d8ae90affb85c4d0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`store-collections\` DROP INDEX \`IDX_861cb26c826f680c0065c50933\``,
    );
    await queryRunner.query(`DROP TABLE \`store-collections\``);
  }
}
