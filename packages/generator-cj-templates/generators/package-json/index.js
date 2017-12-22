const Generator = require('yeoman-generator');
const PackageJson = require('../../helpers/PackageJson');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.packageJson = new PackageJson(this);
  }

  conflicts() {
    this.packageJson.write();
  }
};
