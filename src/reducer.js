
import { combineReducers } from 'redux';
import subscriptionReducer from './containers/subscriptionReducer'; // Agrega el nuevo reducer aquí

const rootReducer = combineReducers({
  subscription: subscriptionReducer, // Agrega el nuevo reducer aquí
  // ...otros reducers aquí si los tienes
});

export default rootReducer;