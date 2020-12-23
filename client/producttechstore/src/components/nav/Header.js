import { Menu } from 'antd';
import React, { useState } from 'react';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userReducer/userTypes';
const { SubMenu, Item } = Menu;

export default function Header() {
	const [ current, setCurrent ] = useState('');
	let dispatch = useDispatch();

	const handleClick = (e) => {
		setCurrent(e.key);
	};
	const logout = () => {
		firebase.auth().signOut();
		dispatch(logoutUser());
	};

	return (
		<Menu onClick={(e) => handleClick(e)} selectedKeys={[ current ]} mode="horizontal">
			<Item key="home" icon={<AppstoreOutlined />}>
				<Link to="/">Home</Link>
			</Item>
			<SubMenu icon={<SettingOutlined />} title="Username">
				<Item key="setting:1">Option 1</Item>
				<Item key="setting:2">Option 2</Item>
				<Item icon={<UserOutlined />} onClick={logout}>
					Logout
				</Item>
			</SubMenu>
			<Item key="login" icon={<UserOutlined />} className="float-right">
				<Link to="/login">Login</Link>
			</Item>
			<Item key="register" icon={<UserAddOutlined />} className="float-right">
				<Link to="/register">Register</Link>
			</Item>
		</Menu>
	);
}
