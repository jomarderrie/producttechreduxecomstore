import { LOGGED_IN_USER, LOGOUT } from './userConst';
export const loggedInUser = (user) => {
	return {
		type: LOGGED_IN_USER,
		payload: user
	};
};

export const logoutUser = () => {
	return {
		type: LOGOUT,
		payload: null
	};
};
