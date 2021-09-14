import React, {useState} from "react";
import {Menu, Badge, Divider, Form, Input} from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import firebase from "firebase";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Search from "../forms/Search";
import Group from "antd/es/input/Group";

const {SubMenu, Item} = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let {user, cart} = useSelector((state) => ({...state}));

    let history = useHistory();

    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/login");
    };


    const centerStyle = {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: "center"
    };

    return (
        <Menu onClick={handleClick} className={centerStyle} style={{alignItems: "center", height: "50px"}}
              selectedKeys={[current]} mode="horizontal">
            <Group style={{display: "flex"}}>
                <Item key="home" icon={<AppstoreOutlined/>}>
                    <Link to="/">Home</Link>
                </Item>

                <Item key="shop" icon={<ShoppingOutlined/>}>
                    <Link to="/shop">Shop</Link>
                </Item>

            </Group>

            <Group style={{width: "100%"}}>
                <Item style={{width: "100%"}}>
                    <Search/>
                </Item>
            </Group>

            <Group>

                {!user && (
                    <Item key="register" icon={<UserAddOutlined/>} className="float-right" style={{float: 'right'}}>
                        <Link to="/register">Register</Link>
                    </Item>
                )}

                {!user && (
                    <Item key="login" icon={<UserOutlined/>} className="float-right">
                        <Link to="/login">Login</Link>
                    </Item>
                )}

                {user && (
                    <SubMenu
                        icon={<SettingOutlined/>}
                        title={user.email && user.email.split("@")[0]}
                        className="float-right"
                    >
                        {user && user.role === "subscriber" && (
                            <Item>
                                <Link to="/user/history">Dashboard</Link>
                            </Item>
                        )}

                        {user && user.role === "admin" && (
                            <Item>
                                <Link to="/admin/dashboard">Dashboard</Link>
                            </Item>
                        )}

                        <Item icon={<LogoutOutlined/>} onClick={logout}>
                            Logout
                        </Item>
                    </SubMenu>
                )}
                <Item key="cart" className="float-right" style={{float: 'right'}} icon={<ShoppingCartOutlined/>}>
                    <Link to="/cart">
                        <Badge count={cart.length} offset={[9, 0]}>
                            Cart
                        </Badge>
                    </Link>
                </Item>
            </Group>


        </Menu>
    );
};

export default Header;
