import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import Password from './pages/user/Password';
import WishList from './pages/user/Wishlist';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/sub/SubCreate';
import SubUpdate from './pages/sub/SubUpdate';
import AdminDashboard from './pages/admin/AdminDashboard';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './helpers/auth';
import { loggedInUser } from './redux/userReducer/userTypes';
import ProductCreate from './pages/admin/product/ProductCreate';

function App() {
	const dispatch = useDispatch();

	useEffect(
		() => {
			const unSubscribe = auth.onAuthStateChanged(async (user) => {
				if (user) {
					const idTokenResult = await user.getIdTokenResult();
					currentUser(idTokenResult.token)
						.then((res) =>
							dispatch(
								loggedInUser({
									name: res.data.name,
									email: res.data.email,
									token: idTokenResult.token,
									role: res.data.role,
									_id: res.data._id
								})
							)
						)
						.catch((err) => {
							console.log(err);
							toast.error(err.message);
						});
				}
			});
			return () => unSubscribe();
		},
		[ dispatch ]
	);

	return (
		<div>
			<Header />
			<ToastContainer />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/register/complete" component={RegisterComplete} />
				<Route exact path="/forgot/password" component={ForgotPassword} />
				<UserRoute exact path="/user/history" component={History} />
				<UserRoute exact path="/user/password" component={Password} />
				<UserRoute exact path="/user/wishlist" component={WishList} />
				<AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
				<AdminRoute exact path="/admin/category" component={CategoryCreate} />
				<AdminRoute exact path="/admin/product" component={ProductCreate} />
				<AdminRoute exact path="/admin/sub" component={SubCreate} />
				<AdminRoute exact path="/admin/sub" component={SubCreate} />
				<AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
				<AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
			</Switch>
		</div>
	);
}

export default App;
