const Generator = require('yeoman-generator');
const createProjectDir = require('./helpers/createProjectDir');
const gitInit = require('./helpers/gitInit');
const addToGithub = require('./helpers/addToGithub');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'type',
        message: 'Project Type',
        choices: [
          { name: 'Website' },
          { name: 'Desktop App' },
          { name: 'Mobile App' },
          { name: 'Isomorphic App' },
          { name: 'npm module' },
          { name: 'Generator' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        filter: (value) => {
          const newValue = value.toLowerCase();
          return newValue.replace(/ /g, '-');
        },
        message: 'Project name',
      },
      {
        type: 'confirm',
        name: 'createDir',
        message: 'Create a project folder',
        default: true,
      },
      {
        type: 'confirm',
        name: 'github',
        message: 'Add repo to Github',
        default: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  configuring() {
    if (this.props.createDir) createProjectDir();

    gitInit();

    if (this.props.github) addToGithub();
  }

  writing() {
    writePackageJson();
  }
};
