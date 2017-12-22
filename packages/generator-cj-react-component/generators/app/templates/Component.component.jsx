import React, { PureComponent } from 'react';
import Component from 'components/Component/Component.render';

class ComponentComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = { value: '' };
  }

  onChange(event) {
    event.preventDefault();

    const value = event.target.value;

    if (value !== this.state.value) this.setState({ value });
  }

  render() {
    return (
      <ComponentComponent
        prop1={this.props.prop1}
        prop1={this.props.prop1}
        prop1={this.props.prop1}
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
