const { join } = require('path');

const generatorAlias = {
  component: 'react-component',
  eslint: 'eslint',
};

module.exports = function (command) {
  process.argv.splice(2);

  let generator = command;
  const aliasOf = generatorAlias[generator];

  if (generator && aliasOf) generator = aliasOf;

  let localGenerator;
  const isStandalone = false;

  if (isStandalone) {
    localGenerator = join(
      __dirname,
      '../../node_modules/generator-cj-templates/generators/eslint/index.js'
    );
  } else {
    localGenerator = join(
      __dirname,
      `../../../generator-cj-templates/generators/${generator}/index.js`
    );
  }

  process.argv.push(localGenerator);

  // eslint-disable-next-line global-require
  require('yo/lib/cli');
};
