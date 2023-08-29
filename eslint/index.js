const fs = require('fs');
const path = require('path');

const ruleFiles = fs
  .readdirSync(__dirname)
  .filter((filename) => filename !== 'index.js');

const rules = Object.fromEntries(
  ruleFiles.map((file) => [path.basename(file, '.js'), require(`./${file}`)]),
);

module.exports = { rules };
