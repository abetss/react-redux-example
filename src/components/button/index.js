import React from 'react';
import ButtonDefault from './button-default';
import ButtonAqua from './button-aqua';
import { FeatureToggle, Variant, Default } from '../../containers/feature-toggle';
// import optimizely from 'optimizely-client-sdk';
// import axios from 'axios';

// let optimizelyClientInstance;
// const url = 'https://cdn.optimizely.com/json/8169608286.json';
// axios.get(url)
//   .then(datafile => {
//     window.console.log(datafile);
//     optimizelyClientInstance = optimizely.createInstance({ datafile: datafile.json() });
//   })
//   .catch(error => {
//     window.console.log(error);
//   });

function Button({
  ...props
}) {
  // window.console.log('optimzely client', optimizelyClientInstance);
  // const variationKey = optimizelyClientInstance.activate('counter-button', userId);
  // if (variationKey === 'default') {
  //   window.console.log('variation', variationKey);
  // } else if (variationKey === 'button-aqua') {
  //   window.console.log('variation', variationKey);
  // } else {
  //   window.console.log('no variation', variationKey);
  // }

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
