import { featureToggleConfig } from '../feature-toggle.config';
import { fromJS } from 'immutable';

import optimizely from 'optimizely-client-sdk';
const optimizelyData = {'version': '2', 'projectId': '8169608286', 'experiments': [{'status': 'Running', 'audienceIds': [], 'variations': [{'id': '8174447417', 'key': 'default'}, {'id': '8164082278', 'key': 'button-aqua'}], 'id': '8165994415', 'key': 'counter-button', 'layerId': '8172407027', 'trafficAllocation': [{'entityId': '8174447417', 'endOfRange': 5000}, {'entityId': '8164082278', 'endOfRange': 10000}], 'forcedVariations': {}}], 'audiences': [], 'groups': [], 'attributes': [], 'revision': '6', 'events': [{'experimentIds': ['8165994415'], 'id': '8169732863', 'key': 'counter-button'}], 'accountId': '8169608286'};

const randomIndex = Math.round(Math.random() * 6);
const userId = ['user1', 'usser2', 'user3', 'user4', 'u111', 'u112', 'u113'][randomIndex];

export const createToggleFlagsMap = (toggleConfig) => {
  const toggleFlagsMap = {};
  Object.keys(toggleConfig).forEach(key => {
    toggleFlagsMap[key] = toggleConfig[key].variant;
  });
  return toggleFlagsMap;
};

const optimizelyClientInstance = optimizely.createInstance({ datafile: optimizelyData });
const variationKey = optimizelyClientInstance.activate('counter-button', userId);
optimizelyClientInstance.track('counter-button', userId);
const toggleMap = createToggleFlagsMap(featureToggleConfig);
// updating toggle map with optimizely value
toggleMap['counter-button'] = variationKey;

const INITIAL_STATE = fromJS(toggleMap);

function featureTogglesReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

  default:
    return state;
  }
}

export default featureTogglesReducer;
