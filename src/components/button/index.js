import React from 'react';
import ButtonDefault from './button-default';
import ButtonAqua from './button-aqua';
import { Experiment, Variant, Default } from '../../containers/feature-toggle';

function Button({
  ...props
}) {
  return (
    <Experiment name="counter-button">
      <Default>
          <ButtonDefault {...props}/>
      </Default>
      <Variant name="button-aqua">
          <ButtonAqua {...props}/>
      </Variant>
  </Experiment>);
}

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: React.PropTypes.func,
};

export default Button;
