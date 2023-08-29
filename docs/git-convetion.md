# Commit convention

Commit with format **type(scope?): subject**

**type** enums:

chore, feat, fix, perf, refactor, revert, ut

**scope** ticked No

Ex: #123

**subject** content message

## Example

```
feat(#123): create user
fix(#123,#456): fix bug edit form
ut(#123): content message
chore: config session
```

# Branch naming convention

feat='feat\/[0-9]+(-[a-z0-9]+)?'

fix='fix\/(\d+)(,\d+)?(-[a-z0-9]+)+'

ut='ut\/(\d+)(,\d+)?(-[a-z0-9]+)+'

chore='chore\/([a-z0-9])+(-[a-z0-9]+)+'
...

## Example

```
feat/123-create-user
fix/123-fix-form-edit
chore/config-session
```
