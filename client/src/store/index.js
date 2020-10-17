import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import gameReducers from './reducers/gameReducers';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  gameReducers,
  userReducer
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store;