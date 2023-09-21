// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
export function chunkArray<T>(array: T[], size: number): T[][] {
  return array.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(array.slice(i, i + size));
    }

    return acc;
  }, [] as T[][]);
}
