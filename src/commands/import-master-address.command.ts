// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Inject, Logger } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import { Command, CommandRunner } from 'nest-commander';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DataSource, EntityManager } from 'typeorm';

import { District } from '@/modules/district/entities/district.entity';
import { Province } from '@/modules/province/entities/province.entity';
import { Ward } from '@/modules/ward/entities/ward.entity';
import { generateSlug } from '@/shared/utils/app.util';
import { chunkArray } from '@/shared/utils/utils';

@Command({
  name: 'import-master-address',
  description: 'Import master address (province, district, ward)',
})
export class ImportMasterAddressCommand extends CommandRunner {
  private readonly rootPath = __dirname.split('/').slice(0, -1).join('/');
  private readonly path = this.rootPath + '/external-data/master-address';

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,

    private readonly dataSource: DataSource,
  ) {
    super();
  }

  async run() {
    const csvProvincePath = `${this.path}/province.csv`;
    const csvDistrictPath = `${this.path}/district.csv`;
    const csvWardPath = `${this.path}/ward.csv`;

    await this.dataSource.transaction(async (manager: EntityManager) => {
      await Promise.all([
        this.importDataChunk(csvProvincePath, manager),
        this.importDataChunk(csvDistrictPath, manager),
        this.importDataChunk(csvWardPath, manager),
      ]);
    });

    unlinkSync(csvProvincePath);
    unlinkSync(csvDistrictPath);
    unlinkSync(csvWardPath);

    this.logger.log('Import master address completed.');
    process.exit(0);
  }

  private async importDataChunk(
    csvPath: string,
    manager: EntityManager,
  ): Promise<void> {
    const csvDistrictPath = `${this.path}/district.csv`;
    const csvWardPath = `${this.path}/ward.csv`;

    if (!existsSync(csvPath)) {
      this.logger.error(`${csvPath}' not found`);
      process.exit(1);
    }
    const file = createReadStream(csvPath);

    const values = [];

    if (csvPath === csvDistrictPath) {
      return new Promise((resolve, reject) => {
        file
          .pipe(csvParser({ headers: false }))
          .on('data', async (row) => {
            const code = row[0];
            const name = row[1];
            const slug = generateSlug(name);
            const type = row[3];
            const provinceId = row[4];

            values.push({
              code,
              name,
              slug,
              type,
              provinceId,
            });
          })
          .on('end', async () => {
            values.length &&
              (await this.insertDataInChunks(District, values, manager));
            unlinkSync(csvPath);
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    }

    if (csvPath === csvWardPath) {
      return new Promise((resolve, reject) => {
        file
          .pipe(csvParser({ headers: false }))
          .on('data', async (row) => {
            const code = row[0];
            const name = row[1];
            const slug = generateSlug(name);
            const type = row[3];
            const districtId = row[4];

            values.push({
              code,
              name,
              slug,
              type,
              districtId,
            });
          })
          .on('end', async () => {
            values.length &&
              (await this.insertDataInChunks(Ward, values, manager));
            unlinkSync(csvPath);
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    }

    return new Promise((resolve, reject) => {
      file
        .pipe(csvParser({ headers: false }))
        .on('data', async (row) => {
          const code = row[0];
          const name = row[1];
          const slug = generateSlug(name);
          const type = row[3];

          values.push({
            code,
            name,
            slug,
            type,
          });
        })
        .on('end', async () => {
          values.length &&
            (await this.insertDataInChunks(Province, values, manager));
          unlinkSync(csvPath);
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  private async insertDataInChunks(
    entity: any,
    values: any[],
    manager: EntityManager,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const chunks = chunkArray(values, 1000);
      const totalChunks = chunks.length;
      let processedChunks = 0;

      chunks.forEach(async (chunk) => {
        try {
          await manager
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values(chunk)
            .execute();

          processedChunks++;
          if (processedChunks === totalChunks) {
            resolve();
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
