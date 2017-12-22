'use strict';
const Generator = require('yeoman-generator');
const { join } = require('path');
let findComponentDir = require('./helpers/findComponentDir');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    findComponentDir = findComponentDir.bind(this);

    this.fileChoices = [
      {
        name: 'Container',
        checked: true,
      },
      {
        name: 'Component',
        checked: true,
      },
      {
        name: 'Render',
        checked: true,
      },
      {
        name: 'Style',
        checked: true,
      },
      {
        name: 'Helper',
        checked: false,
      },
      {
        name: 'Tests',
        checked: false,
      }
    ];
  }

  initializing() {
    this.componentDir = findComponentDir();
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'Component Name',
        validate: (value) => value && value.length > 0 || 'Name must be provided',
        filter: (value) => `${value.charAt(0).toUpperCase()}${value.slice(1)}`,
      },
      {
        type: 'checkbox',
        name: 'files',
        message: 'Files',
        store: true,
        validate: (value) => {
          if (!value.includes('Container') && !value.includes('Component') && !value.includes('Render')) {
            return 'Container, Component or Render must be selected';
          }

          return true;
        },
        choices: this.fileChoices,
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;

      if (props.files.includes('Container')) {
        return this.prompt([{
          type: 'confirm',
          name: 'withRouter',
          message: 'Use React Router in container?',
          default: false,
        }]).then(({ withRouter }) => {
          this.props.withRouter = withRouter;
        });
      }

      return Promise.resolve();
    });
  }

  writing() {
    const componentDir = join(this.componentDir, this.props.componentName);
    const templateData = Object.assign({}, this.props);

    this.fileChoices.forEach(({ name }) => {
      templateData[name.toLowerCase()] = this.props.files.includes(name);
    });

    this.props.files.forEach((file) => {
      let templatePath;
      let destinationPath;
      let type;

      switch(file) {
        case 'Container':
        case 'Style':
          type = file.toLowerCase();
          templatePath = `Component.${type}.js`;
          destinationPath = `${this.props.componentName}.${type}.js`;
          break;

        case 'Component':
        case 'Render':
          type = file.toLowerCase();
          templatePath = `Component.${type}.jsx`;
          destinationPath = `${this.props.componentName}.${type}.jsx`;
          break;

        case 'Helper':
          templatePath = 'helpers/helper.js';
          destinationPath = 'helpers/helper.js';
          break;

        default:
          return;
      }

      this.fs.copyTpl(
        this.templatePath(templatePath),
        join(componentDir, destinationPath),
        templateData
      );
    });

    if (this.props.files.includes('Tests')) {
      this.props.files.forEach((file) => {
        let templatePath;
        let destinationPath;
        let type;

        switch(file) {
          case 'Container':
            templatePath = 'Component.container.js';
            destinationPath = `${this.props.componentName}.container.js`;
            break;

          case 'Component':
          case 'Render':
            type = file.toLowerCase();
            templatePath = `Component.${type}.jsx`;
            destinationPath = `${this.props.componentName}.${type}.jsx`;
            break;

          case 'Helper':
            templatePath = 'helper.js';
            destinationPath = 'helper.js';
            break;

          default:
            return;
        }

        this.fs.copyTpl(
          this.templatePath(`__tests__/${templatePath}`),
          join(componentDir, '__tests__', destinationPath),
          templateData
        );
      });
    }

    this.fs.copyTpl(
      this.templatePath('index.js'),
      join(componentDir, 'index.js'),
      templateData
    );
  }
};
