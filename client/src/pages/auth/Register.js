import React, {useState, useEffect} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {MailOutlined} from "@ant-design/icons";
import {createUser} from "../../functions/auth";

const Register = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        if (user && user.token) history.push("/");
    }, [user, history]);
    let dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
             await createUser(email, password).then((res) => {
                // localStorage.setItem("JWT", JSON.stringify(res.data.token));
                console.log(res)
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        name: res.data.userResp.name,
                        email: res.data.userResp.email,
                        token: res.data.userResp.token,
                        role: res.data.userResp.role,
                        _id: res.data.userResp._id,
                    },
                });

                history.push("/");
                toast.success(
                    `Successfully registered`
                );
            })



        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }

        setLoading(false);
        setPassword("")
        setEmail("");
    };

    const registerForm = () => (
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

            <br/>
            <Button
                onClick={handleSubmit}
                type="primary"
                className="mb-3"
                block
                shape="round"
                icon={<MailOutlined/>}
                size="large"
                disabled={!email || password.length < 6}
            >
                Register with Email/Password
            </Button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;
