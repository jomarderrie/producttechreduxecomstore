import { combineReducers } from 'redux';
import { userReducer } from './userReducer/userReducer';

export default combineReducers({
	user: userReducer
});
