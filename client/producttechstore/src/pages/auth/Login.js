import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loggedInUser } from '../../redux/userReducer/userTypes';
import axios from 'axios';

const createOrUpdateUser = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/create-or-update-user`,
		{},
		{
			headers: {
				authtoken
			}
		}
	);
};

export default function Login({ history }) {
	const [ email, setEmail ] = useState('nathangemieee@gmail.com');

	const [ password, setPassword ] = useState('dog123');
	const [ loading, setLoading ] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			// console.log(result);
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();

			createOrUpdateUser(idTokenResult.token)
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

			setLoading(false);
			history.push('/');
		} catch (err) {
			console.log(err);
			toast.error(err.message);
			setLoading(false);
		}
	};

	useEffect(
		() => {
			if (user && user.token) history.push('/');
		},
		[ user, history ]
	);
	const loginForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Your email"
					autoFocus
				/>
			</div>

			<div className="form-group">
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Your password"
				/>
			</div>

			<br />
			<Button
				onClick={handleSubmit}
				type="primary"
				className="mb-3"
				block
				shape="round"
				icon={<MailOutlined />}
				size="large"
				disabled={!email || password.length < 6}
			>
				Login
			</Button>
		</form>
	);

	const googleLogin = async () => {
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				createOrUpdateUser(idTokenResult.token).then((res) =>
					dispatch(
						loggedInUser({
							name: res.data.name,
							email: res.data.email,
							token: idTokenResult.token,
							role: res.data.role,
							_id: res.data._id
						})
					)
				);
				history.push('/');
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
	};

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					{loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4>}
					{loginForm()}

					<Button
						type="danger"
						className="mb-3"
						block
						shape="round"
						icon={<GoogleOutlined />}
						size="large"
						onClick={googleLogin}
					>
						Login with Google
					</Button>

					<Link to="/forgot/password" className="float-right text-danger">
						Forgot Password
					</Link>
				</div>
			</div>
		</div>
	);
}
