'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  configuring() {
    this.yarnInstall([
      'eslint',
      'eslint-config-airbnb',
      'eslint-import-resolver-babel-module',
      'eslint-plugin-flowtype',
      'eslint-plugin-import',
      'eslint-plugin-jest',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
    ], { 'dev': true });
  }

  writing() {
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationPath(),
    );
  }
};
