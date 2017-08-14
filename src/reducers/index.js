import initialState from '../state';
import {
  SET_STEP,
} from '../ducks';

function wizardReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STEP: {
      console.log(state);
      console.log(action.payload.step);
      return { ...state, step: action.payload.step };
    }
  }

  return state;
}

export default {
  wizard: wizardReducer,
};
