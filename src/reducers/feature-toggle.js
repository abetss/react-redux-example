import { featureToggleConfig } from '../feature-toggle.config';
import { fromJS } from 'immutable';
import { FEATURE_TOGGLED } from '../constants';

export const createToggleFlagsMap = (toggleConfig) => {
  const toggleFlagsMap = {};
  Object.keys(toggleConfig).forEach(key => {
    toggleFlagsMap[key] = toggleConfig[key].variant;
  });
  return toggleFlagsMap;
};

const toggleMap = createToggleFlagsMap(featureToggleConfig);

const INITIAL_STATE = fromJS(toggleMap);

function featureTogglesReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

  case FEATURE_TOGGLED:
    return state.merge(fromJS(action.payload));

  default:
    return state;
  }
}

export default featureTogglesReducer;
