import { Menu } from 'antd';
import React, { useState } from 'react';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userReducer/userTypes';
import { useHistory } from 'react-router-dom';
const { SubMenu, Item } = Menu;
export default function Header() {
	const [ current, setCurrent ] = useState('');
	let dispatch = useDispatch();
	let { user } = useSelector((state) => ({ ...state }));

	let history = useHistory();

	const handleClick = (e) => {
		setCurrent(e.key);
	};
	const logout = () => {
		firebase.auth().signOut();
		dispatch(logoutUser());
		history.push('/login');
	};

	return (
		<Menu onClick={(e) => handleClick(e)} selectedKeys={[ current ]} mode="horizontal">
			<Item key="home" icon={<AppstoreOutlined />}>
				<Link to="/">Home</Link>
			</Item>

			{user && (
				<SubMenu
					icon={<SettingOutlined />}
					title={user.email && user.email.split('@')[0]}
					className="float-right"
				>
					{user &&
					user.role === 'subscriber' && (
						<Item>
							<Link to="/user/history">Dashboard</Link>
						</Item>
					)}

					{user &&
					user.role === 'admin' && (
						<Item>
							<Link to="/admin/dashboard">Dashboard</Link>
						</Item>
					)}

					<Item icon={<LogoutOutlined />} onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}

			{!user && (
				<Item key="login" icon={<UserOutlined />} className="float-right">
					<Link to="/login">Login</Link>
				</Item>
			)}
			{!user && (
				<Item key="register" icon={<UserAddOutlined />} className="float-right">
					<Link to="/register">Register</Link>
				</Item>
			)}
		</Menu>
	);
}
