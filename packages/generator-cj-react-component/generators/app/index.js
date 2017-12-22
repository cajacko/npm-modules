'use strict';
const Generator = require('yeoman-generator');
const { join } = require('path');
let findComponentDir = require('./helpers/findComponentDir');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    findComponentDir = findComponentDir.bind(this);
  }

  initializing() {
    this.componentDir = findComponentDir();
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name',
        validate: (value) => value && value.length > 0 || 'Name must be provided',
      },
      {
        type: 'checkbox',
        name: 'files',
        message: 'Files',
        store: true,
        validate: (value) => {
          if (!value.includes('Container') || !value.includes('Component') || !value.includes('Render')) {
            return 'Container, Component or Render must be selected';
          }

          return true;
        },
        choices: [
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
        ]
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      console.warn(props);
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('*'),
      join(this.findComponentDir, this.props.name)
    );
  }
};
