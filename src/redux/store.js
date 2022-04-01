import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import userReducer from './userReducer';

const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
      return (handlers[action.type] && handlers[action.type](state, action)) || state;
    };
  };
  
  const catReducers = createReducer(userReducer.initialState, userReducer.actions)
  

const rootReducer = combineReducers({
    cats: catReducers,
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));