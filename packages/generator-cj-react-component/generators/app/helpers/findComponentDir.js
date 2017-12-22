const { pathExistsSync } = require('fs-extra');
const { join } = require('path');

const paths = [
  'src/components',
  'components',
  '../components',
  '../../components',
  '../src/components',
  '../../src/components',
  'views/components',
  '../views/components',
  '../../views/components'
];

module.exports = function () {
  const destinationPath = this.destinationPath();

  for (var i = 0; i < paths.length; i++) {
    const path = join(destinationPath, paths[i]);

    if (pathExistsSync(path)) return path;
  }

  return destinationPath;
}
