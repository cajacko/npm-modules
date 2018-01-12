// Do any global overrides, styles we want to pply to every instance of the
// following elements.
import styled from 'styled-components';
import cloneDeep from 'lodash/fp/cloneDeep';

// Create a copy of the styled-components module for us to edit and play with
const customStyled = cloneDeep(styled);

// Remove borders
['fieldset'].forEach((element) => {
  const Element = styled[element]`
    display: flex;
    border: 0;
    flex-direction: column;
  `;

  customStyled[element] = Element.extend;
});

// Get rid of all padding and margins on the following elements
['p', 'ul', 'fieldset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((element) => {
  const Element = styled[element]`
    margin: 0;
    padding: 0;
    display: flex;
    border: 0;
    flex-direction: column;
  `;

  customStyled[element] = Element.extend;
});

// For the foloowing elements, always display as flex box
[
  'div',
  'nav',
  'button',
  'li',
  'img',
  'main',
  'section',
  'header',
  'footer',
  'form',
  'input',
  'label',
  'article',
].forEach((element) => {
  const Element = styled[element]`
    display: flex;
    flex-direction: column;
  `;

  customStyled[element] = Element.extend;
});

export default customStyled;
