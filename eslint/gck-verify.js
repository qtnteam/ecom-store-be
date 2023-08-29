// @ts-check
/** @type {import('eslint').Rule.RuleModule} */

module.exports = {
  meta: {
    fixable: 'code',
  },
  create(context) {
    return {
      Program: function (node) {
        const hashCodes = node.comments?.filter(({ value }) =>
          /^ *gkc_hash_code *: 01GYS4MFBRHRYQ4ENZEFBHPDA0$/.test(value),
        );
        const isError =
          !hashCodes || hashCodes.every(({ range }) => range?.[0] !== 0);

        if (isError) {
          return context.report({
            node,
            message: 'Missing GKC hash code at top of file',
            fix(fixer) {
              hashCodes?.forEach(({ range }) => {
                if (range && range[0] !== 0) fixer.removeRange(range);
              });

              return fixer.insertTextBeforeRange(
                [0, 0],
                '// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0\r\n',
              );
            },
          });
        }
      },
    };
  },
};
