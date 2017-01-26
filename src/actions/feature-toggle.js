import {
  FEATURE_TOGGLED,
  INIT_LUNCHDARKLY_ERROR,
  INIT_LUNCHDARKLY_PENDING,
  INIT_LUNCHDARKLY_SUCCESS,
  TOGGLE_COUNTER_BUTTON,
} from '../constants';

import LDClient from 'ldclient-js';

const userInfo = {
  'key': 'aa0ceb',
  'firstName': 'Ernestina',
  'lastName': 'Evans',
  'email': 'ernestina@example.com',
  'custom': {
    'groups': ['Google', 'Microsoft'],
  },
};

const ldClientID = '588913f45d265b0ac0617d16';

const dispatchVariant = (fulfillPromise, ldClient) => {
  const shouldShow = ldClient.variation('counter-button', false);
  fulfillPromise({[TOGGLE_COUNTER_BUTTON]: shouldShow});
};

const getFlagsLunchDarkly = (clientID, user) => {
  const ldclient = LDClient.initialize(clientID, user);
  return new Promise(fulfill => {
    ldclient.on('ready', () => dispatchVariant(fulfill, ldclient));
    // If we want to utilize the ldclient on change event we need use it in th app.js
    // file. See the commented code in the app.js. The benefit of using the
    // ld client on change event is that the flagged feature can get toggled
    // before a page refresh
    // ldclient.on('change', () => dispatchVariant(fulfill, ldclient));
  });
};

export function initLunchDarkly() {
  return (dispatch) => {
    return dispatch({
      types: [
        INIT_LUNCHDARKLY_PENDING,
        INIT_LUNCHDARKLY_SUCCESS,
        INIT_LUNCHDARKLY_ERROR,
      ],
      payload: {
        promise: getFlagsLunchDarkly(ldClientID, userInfo)
          .then(variationMap => {
            dispatch({
              type: FEATURE_TOGGLED,
              payload: {
                ...variationMap,
              },
            });

            return variationMap;
          }),
      },
    });
  };
}
