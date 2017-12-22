const chalk = require('chalk');

module.exports = function(commands, command, params, argv) {
  console.error(chalk.red('\nUnknown command. The following commands are supported:\n'));

  const validCommands = Object.assign({}, commands);

  delete validCommands.unknownCommand;

  Object.keys(validCommands).forEach((commandName) => {
    console.log(` - ${commandName}`);
  });

  console.log('\n');

  throw new Error('Unknown command');
}
