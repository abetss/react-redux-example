import React from 'react';
import { connect } from 'react-redux';

export function Variant(props) {
  return React.Children.only(props.children);
}

Variant.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export function Default(props) {
  return React.Children.only(props.children);
}

export function Selector(props) {
  const { variant, children } = props;
  let chosenOne;
  let defaultOne;
  React.Children.forEach(children, child => {
    if (child.type === Default) {
      defaultOne = React.cloneElement(child);
    }

    // set as variant if the name matched or variant was true (to support boolean based
    // feature flags)
    if (child.type === Variant && (child.props.name === variant || variant === true)) {
      chosenOne = React.cloneElement(child);
    }
  });
  return chosenOne || defaultOne;
}

Selector.propTypes = {
  name: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const variant = state.featureToggle.get(ownProps.name);
  return {
    variant: variant || null,
  };
};

export const FeatureToggle = connect(mapStateToProps)(Selector);

