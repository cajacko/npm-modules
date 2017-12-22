import React, { PureComponent } from 'react';
import { Container, Div, Text, Button } from 'components/Component/Component.style';

class Component extends PureComponent {
  render() {
    return (
      <Container>
        <Div prop1={this.props.prop1}>
          {this.props.prop2 && <Text>Hello</Text>}
          <Button onChange={this.props.onChange}>{this.props.value}</Button>
        </Div>
      </Container>
    )
  }
}

ComponentComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

ComponentComponent.defaultProps = {
  prop2: false,
};

export default ComponentComponent;
