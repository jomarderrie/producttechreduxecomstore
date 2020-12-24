import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { loggedInUser } from '../../redux/userReducer/userTypes';
import { createOrUpdateUser } from '../../helpers/auth';

export default function RegisterComplete({ history }) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error('Email and password is required');
			return;
		}

		if (password.length < 6) {
			toast.error('Password must be at least 6 characters long');
			return;
		}

		try {
			const result = await auth.signInWithEmailLink(email, window.location.href);

			if (result.user.emailVerified) {
				window.localStorage.removeItem('emailForRegistration');
				console.log(auth.currentUser);
				let user = auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();

				console.log(idTokenResult);

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

				history.push('/');
			}
			console.log(result);
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegistration'));
	}, []);

	const completeRegistrationForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<label>Email</label>
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled
				/>
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoFocus
				/>
				<button type="submit" className="btn btn-raised">
					Register now!
				</button>
			</form>
		);
	};

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Register</h4>

					{completeRegistrationForm()}
				</div>
			</div>
		</div>
	);
}
