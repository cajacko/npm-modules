const Generator = require('../../helpers/Generator');

module.exports = class extends Generator {
  // configuring() {
  //   this.yarnInstall(
  //     [
  //       'eslint',
  //       'eslint-config-airbnb',
  //       'eslint-import-resolver-babel-module',
  //       'eslint-plugin-flowtype',
  //       'eslint-plugin-import',
  //       'eslint-plugin-jest',
  //       'eslint-plugin-jsx-a11y',
  //       'eslint-plugin-react',
  //     ],
  //     { dev: true }
  //   );
  // }

  writing() {
    console.log('writing');
    this.fs.copy(this.templatePath('.*'), this.destinationPath());

    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: { 'test:lint': 'eslint --ext .js --ext .jsx src' },
    });

    this.packageJson.set({
      scripts: [
        {
          name: 'test:lint',
          script: 'eslint --ext .js --ext .jsx src',
          order: 10,
        },
      ],
      testScripts: [
        {
          script: 'yarn test:lint',
          order: 1,
        },
        {
          script: 'yarn test:woo',
          order: 2,
        },
      ],
    });
  }
};
