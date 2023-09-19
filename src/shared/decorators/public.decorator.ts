// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { SetMetadata } from '@nestjs/common';

import { IS_PUBLIC } from '@/constants/app.constant';

export const Public = () => SetMetadata(IS_PUBLIC, true);
