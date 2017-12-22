const generatorAlias = {
  component: 'cj-react-component',
  eslint: 'cj-eslint'
};

module.exports = function() {
  process.argv.splice(2);

  process.argv.push('./node_modules/generator-cj-templates/generators/eslint/index.js');

  // const generator = process.argv[2];
  // const aliasOf = generatorAlias[generator];
  //
  // if (generator && aliasOf) process.argv[2] = aliasOf;

  console.log(process.argv);

  require('yo/lib/cli');
}
