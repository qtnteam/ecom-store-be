//.commitlintrc
module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',

  plugins: [
    {
      rules: {
        /**
         * - If a type does not appear in the rule, do not enforce scope
         * - If a type appears in the rule with an empty array,
         *   do not allow scope
         * - If a type appears in the rule with an non-empty array,
         *   only allow the values in the array for scope.
         * - If the array includes null, the scope is optional.
         *
         * E.g., {
         *   'allowed-scopes': [2, "always", {
         *     feat: [/^frontend\/[^\/]+$/, 'backend'],
         *     perf: [],
         *     ci: [null, 'codebuild', 'jenkins']
         *   }]
         * }
         *
         * In the above rules configuration,
         *  - if the type is 'feat', the scope must be either
         *    match the regex /frontend\/[^\/]+/ or be 'backend'
         *  - if the type if 'chore', the scope is optional and can
         *    be anything
         *  - if the type is 'perf', a scope is not allowed
         *  - if the type is 'ci', the scope must be 'codebuild' or
         *    'jenkins' if present, but is not required
         */
        'scope-enums': (ctx, applicable, rule) => {
          if (applicable === 'never') {
            return [
              false,
              'the "allowed-scopes" rule does not support "never"',
            ];
          }

          const allowedScopes = rule[ctx.type];

          // If the type does not appear in the rule config, allow any scope or no scope
          if (allowedScopes === undefined) {
            return [true];
          }

          if (Array.isArray(allowedScopes)) {
            // If the type maps to an empty array in the rule config, scope it not allowed
            if (allowedScopes.length === 0) {
              if (ctx.scope != null) {
                return [
                  false,
                  `commit messages with type "${ctx.type}" must not specify a scope`,
                ];
              }

              return [true];
            }

            // Otherwise attempt to match against either null, a string literal, or a RegExp
            if (
              allowedScopes.findIndex((s) => {
                if (
                  typeof ctx.scope === 'string' &&
                  Object.prototype.toString.call(s) === '[object RegExp]'
                ) {
                  return ctx.scope.match(s);
                }

                // Equality comparison works for both strings and null
                return s === ctx.scope;
              }) !== -1
            ) {
              return [true];
            } else if (allowedScopes.includes(null)) {
              return [
                false,
                `commit message with type "${
                  ctx.type
                }" may specify a scope, but if specified, it must be one of the following: ${allowedScopes
                  .filter((s) => s !== null)
                  .map((s) => `"${s}"`)
                  .join(', ')}`,
              ];
            } else {
              return [
                false,
                `commit message with type "${
                  ctx.type
                }" must specify one of the following scopes: ${allowedScopes
                  .map((s) => `"${s}"`)
                  .join(', ')}`,
              ];
            }
          }

          return [
            false,
            `invalid rule entry: { ${ctx.type}: ${JSON.stringify(
              allowedScopes,
            )} }`,
          ];
        },
      },
    },
  ],

  rules: {
    'scope-enums': [
      2,
      'always',
      {
        // fix: [/^#\d+$/],
        feat: [/(#\d+)(,#\d+)?/],
        fix: [/(#\d+)(,#\d+)?/],
        ut: [/(#\d+)(,#\d+)?/],
        perf: [null],
      },
    ],

    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['chore', 'feat', 'fix', 'perf', 'refactor', 'revert', 'ut'],
    ],
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description:
              'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description:
              'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          ut: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
