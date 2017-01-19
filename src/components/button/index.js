import React from 'react';
import ButtonDefault from './button-default';
import ButtonAqua from './button-aqua';
import { FeatureToggle, Variant, Default } from '../../containers/feature-toggle';

function Button({
  ...props
}) {
  return (
    <FeatureToggle name="counter-button">
      <Default>
          <ButtonDefault {...props}/>
      </Default>
      <Variant name="button-aqua">
          <ButtonAqua {...props}/>
      </Variant>
  </FeatureToggle>);
}

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: React.PropTypes.func,
};

export default Button;
