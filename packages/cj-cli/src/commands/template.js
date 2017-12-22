const generatorAlias = {
  component: 'cj-react-component',
  eslint: 'cj-eslint'
};

module.exports = function() {
  process.argv.splice(2, 1);

  const generator = process.argv[2];
  const aliasOf = generatorAlias[generator];

  if (generator && aliasOf) process.argv[2] = aliasOf;

  require('yo/lib/cli');
}
