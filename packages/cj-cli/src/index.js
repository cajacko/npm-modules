#! /usr/bin/env node

const parseArgs = require('minimist');
const commands = require('./commands');

const argv = parseArgs(process.argv.slice(2));
const command = argv._[0];
const params = argv._.slice(1);

const options = Object.assign({}, argv);
delete options._;


if (commands[command]) return commands[command](params, options);

commands.unknownCommand(command, params, options);
