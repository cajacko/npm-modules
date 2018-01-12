import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import <%= componentName %> from 'components/<%= componentName %>/<%= componentName %>.render';<% if (helper) { %>
import helper from 'components/<%= componentName %>/helpers/helper';<% } %>

/**
 * Business logic for the <%= componentName %> component.
 *
 * Does not render any markup, as markup is only handled but a .render
 * component. This helps to seperate the presentation logic from managing the
 * state and actions. It also makes it easier to handle component updating and
 * rerendering, improving performance.
 *
 * TODO: EXPLAIN CUSTOM BEHAVIOUR HERE
 *
 * @extends PureComponent
 */
class <%= componentName %>Component extends PureComponent {
  /**
   * Initialise the class, set the initial state and bind the methods
   *
   * @param  {Object}    props Props passed to the component
   * @return {undefined}       No return value
   */
  constructor(props) {
    super(props);

    // TODO: Delete as necessary
    this.onChange = this.onChange.bind(this);

    // TODO: Delete/adjust necessary
    this.state = { value: '' };
  }

  /**
   * Example method
   *
   * TODO: Delete this method
   *
   * @param  {Event}     event Event from the action
   * @return {undefined}       No return value
   */
  onChange(event) {
    event.preventDefault();

    const value = <%= helper ? 'helper(' : '' %>event.target.value<%= helper ? ')' : '' %>;

    if (value !== this.state.value) this.setState({ value });
    if (this.props.prop3) this.props.prop3(value);
  }

  /**
   * Render the .render component that handles all the visual presentation.
   * Passing only the props needed for display.
   *
   * @return {String} The html markup to render
   */
  render() {
    return (
      <<%= componentName %>
        prop1={this.props.prop1}
        prop2={this.props.prop2}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

<%= componentName %>Component.propTypes = {
  // prop1: PropTypes.string.isRequired,
  prop2: PropTypes.bool,
  prop3: PropTypes.func,
};

// TODO: Delete as necessary
<%= componentName %>Component.defaultProps = {
  prop2: false,
  prop3: () => {},
};

export default <%= componentName %>Component;
