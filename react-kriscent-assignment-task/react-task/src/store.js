// store.js
import { legacy_createStore } from 'redux';
import rootReducer from './reducers'; // create this file

const store = legacy_createStore(rootReducer);

export default store;
