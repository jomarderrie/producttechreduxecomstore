import { LOGGED_IN_USER, LOGOUT } from './userConst';
export function userReducer(state = null, action) {
	switch (action.type) {
		case LOGGED_IN_USER:
			console.log(action);
			return action.payload;
		case LOGOUT:
			return action.payload;
		default:
			return state;
	}
}
