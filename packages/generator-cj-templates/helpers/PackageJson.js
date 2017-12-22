const {
  ensureFileSync,
  readJsonSync,
  writeJsonSync,
  removeSync,
} = require('fs-extra');
const { join } = require('path');

module.exports = class PackageJson {
  constructor(yeoman) {
    this.yeoman = yeoman;

    this.filePath = join(__dirname, '../temp/packageJson.json');
    this.destinationPath = this.yeoman.destinationPath('package.json');

    this.defaultFile = { written: false, settings: [] };
  }

  set(settings) {
    ensureFileSync(this.filePath);

    let data;

    try {
      data = readJsonSync(this.filePath);
    } catch (e) {
      data = this.defaultFile;
    }

    if (!data || !data.settings) data = this.defaultFile;

    if (data.written === true) data = this.defaultFile;

    data.settings.push(settings);

    writeJsonSync(this.filePath, data, { spaces: 2 });
  }

  write() {
    let settings;

    try {
      settings = readJsonSync(this.filePath);
    } catch (e) {
      settings = null;
    }

    if (
      !settings ||
      settings.written === true ||
      settings.settings.length === 0
    ) {
      return;
    }

    let packageJson;

    try {
      packageJson = readJsonSync(this.destinationPath);
    } catch (e) {
      packageJson = {};
    }

    let finalTestScripts = [];

    settings.settings.forEach(({ scripts, testScripts }) => {
      if (scripts) {
        scripts.forEach(({ name, script }) => {
          if (!packageJson.scripts) packageJson.scripts = {};

          packageJson.scripts[name] = script;
        });
      }

      if (testScripts) {
        testScripts.forEach(testScript => finalTestScripts.push(testScript));
      }
    });

    if (finalTestScripts.length) {
      let test = '';

      finalTestScripts = finalTestScripts.sort((a, b) => a.order - b.order);

      finalTestScripts.forEach(({ script }, i) => {
        test = `${test}${i ? ' && ' : ''}${script}`;
      });

      if (!packageJson.scripts) packageJson.scripts = {};
      packageJson.scripts.test = test;
    }

    writeJsonSync(this.destinationPath, packageJson, {
      spaces: 2,
    });

    writeJsonSync(this.filePath, { written: true }, { spaces: 2 });
  }

  clear() {
    removeSync(this.filePath);
  }
};
