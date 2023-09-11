// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { CommandFactory } from 'nest-commander';

import { BatchModule } from './batch.module';

async function bootstrap() {
  await CommandFactory.run(BatchModule, ['warn', 'error']);
}

bootstrap();