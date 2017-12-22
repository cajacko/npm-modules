import React, { PureComponent } from 'react';
import Component from 'components/Component/Component.render';
import help from 'components/Component/helpers/helper';

class ComponentComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = { value: '' };
  }

  onChange(event) {
    event.preventDefault();

    const value = helper(event.target.value);

    if (value !== this.state.value) this.setState({ value });
    if (this.props.prop3) this.props.prop3(value);
  }

  render() {
    return (
      <ComponentComponent
        prop1={this.props.prop1}
        prop2={this.props.prop2}
        value={this.state.value}
        onChange=={this.onChange}
      />
    )
  }
}

ComponentComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.bool,
  prop3: PropTypes.func,
};

ComponentComponent.defaultProps = {
  prop2: false,
  prop3: () => {},
};

export default ComponentComponent;
