import optimizely from 'optimizely-client-sdk';
import axios from 'axios';
import {
  INIT_OPTIMIZELY_ERROR,
  INIT_OPTIMIZELY_PERNDING,
  INIT_OPTIMIZELY_SUCCESS,
  TOGGLE_COUNTER_BUTTON,
  FEATURE_TOGGLED,
} from '../constants';

const getRandomUserId = () => {
  const randomIndex = Math.round(Math.random() * 6);
  return ['user1a', 'usser2a', 'user3a', 'user4a', 'u111a', 'u112a', 'u113a'][randomIndex];
};

const userID = getRandomUserId();
const optimizelyConfigUrl = 'https://cdn.optimizely.com/json/8169608286.json';

const initOptimizely = (datafile, userId) => {
  const optimizelyClientInstance = optimizely.createInstance({ datafile: datafile.data});
  // Emitting this event let optimizely record metrics for TOGGLE_COUNTER_BUTTON expirment
  optimizelyClientInstance.track(TOGGLE_COUNTER_BUTTON, userId);

  return optimizelyClientInstance;
};

const getOptimizelyVarientKeys = (optimizelyClientInstance, userId) => ({
  [TOGGLE_COUNTER_BUTTON]: optimizelyClientInstance.activate(TOGGLE_COUNTER_BUTTON, userId),
});

const getKeys = (url, userId) => {
  return axios.get(url)
    .then(datafile => initOptimizely(datafile, userId))
    .then(client => getOptimizelyVarientKeys(client, userId));
};

export function initAtOptimizely() {
  return dispatch => {
    return dispatch({
      types: [INIT_OPTIMIZELY_PERNDING, INIT_OPTIMIZELY_SUCCESS, INIT_OPTIMIZELY_ERROR],
      payload: {
        promise: getKeys(optimizelyConfigUrl, userID)
          .then(variationKeys => {
            dispatch({
              type: FEATURE_TOGGLED,
              payload: {
                [TOGGLE_COUNTER_BUTTON]: variationKeys[TOGGLE_COUNTER_BUTTON],
              },
            });

            return variationKeys;
          }),
      },
    });
  };
}
