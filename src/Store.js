import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import resetEnhancer from './enhancer/reset.js';
import { reducer as loadingReducer } from './components/loading';
import infoReducer from './components/info-account/reducer';
import warnReducer from './pages/priceWarning/reducer';

const originalReducers = {
  loading: loadingReducer,
  routing: routerReducer,
  infoing: infoReducer,
  warning: warnReducer
};
const reducer = combineReducers(originalReducers);
const win = window;
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}
const storeEnhancers = compose(
  resetEnhancer,
  applyMiddleware(...middlewares),
  // (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
  (win && win.__REDUX_DEVTOOLS_EXTENSION__) ? win.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  storeEnhancers
);
store._reducers = originalReducers;
export default store;
