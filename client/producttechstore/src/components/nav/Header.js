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
				<SubMenu icon={<SettingOutlined />} title="Username" className="float-right">
					<Item key="setting:1">Option 1</Item>
					<Item key="setting:2">Option 2</Item>
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
