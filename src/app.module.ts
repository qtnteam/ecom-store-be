// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
