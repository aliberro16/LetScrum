import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const midllewares = [logger]; //made an array because in the future we can modify that array
const store = createStore(rootReducer, applyMiddleware(...midllewares));

export default store;
