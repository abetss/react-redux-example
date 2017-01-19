import { featureToggleConfig } from '../feature-toggle.config';
import { fromJS } from 'immutable';

export const createToggleFlagsMap = (toggleConfig) => {
  const toggleFlagsMap = {};
  Object.keys(toggleConfig).forEach(key => {
    toggleFlagsMap[key] = toggleConfig[key].variant;
  });
  return toggleFlagsMap;
};

const INITIAL_STATE = fromJS(createToggleFlagsMap(featureToggleConfig));

function featureTogglesReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

  default:
    return state;
  }
}

export default featureTogglesReducer;
