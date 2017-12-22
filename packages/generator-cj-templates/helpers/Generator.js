const Generator = require('yeoman-generator');
const { join } = require('path');
const PackageJson = require('./PackageJson');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.packageJson = new PackageJson(this);

    this.composeWith(join(__dirname, '../generators/package-json/index.js'));
  }
};
