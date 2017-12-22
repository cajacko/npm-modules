/**
 * Component entry file. This should be imported by all other components. This
 * makes it easy to change the component entry path. As many components don't
 * need the full .container, .component and .render files.
 *
 * As this is an index.js file you only need to specify the import path to the
 * component directory, instead of to index.js.
 */
import Component from 'components/<%= componentName %>/<%= componentName %>.container';

export default Component;
