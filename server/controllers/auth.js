const User = require("../models/user");
const jwt = require("express-jwt");
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createOrUpdateUser = async (req, res) => {
    const {name, picture, email} = req.user;

    const user = await User.findOneAndUpdate(
        {email},
        {name: email.split("@")[0], picture},
        {new: true}
    );
    if (user) {
        console.log("USER UPDATED", user);
        res.json(user);
    } else {
        console.error(err.message);
        res.status(500).send('Server error');

    }
};


exports.currentUser = async (req, res) => {
    User.findOne({email: req.user.email}).exec((err, user) => {
        if (err) throw new Error(err);
        res.json(user);
    });
};

exports.login = async (req, res) => {
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let errors = []
    let password = req.body.password;
    let email = req.body.email;

    if (password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/) == null) {
        errors.push("Password is incorrect");
    }
    if (emailRegex.exec(email) == null) {
        errors.push("Email is incorrect");
    }
    if (!errors.length === 0) {
        return res.status(400).json({errors: errors});
    }
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res
                .status(400)
                .json({errors: [{msg: 'Invalid Credentials'}]});
        }
        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res
                .status(400)
                .json({errors: [{msg: 'Invalid Credentials'}]});
        }
        console.log("USER logged in", user);
        const payload = {
            user: {
                id: user.id,
                email: user.email
            }
        };
        jsonwebtoken.sign(
            payload, process.env.JWT_SECRET, {expiresIn: '5 days'}, (err, token) => {
                if (err) throw err;
                let userResp = {
                    name: user.name,
                    email: user.email,
                    token,
                    role: user.role,
                    _id: user._id,
                };
                res.json({userResp});
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


exports.createUser = async (req, res) => {
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let errors = []
    let password = req.body.password;
    let email = req.body.email;

    if (password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/) == null) {
        errors.push("Password is incorrect");
    }
    if (emailRegex.exec(email) == null) {
        errors.push("Email is incorrect");
    }
    if (!errors.length === 0) {
        return res.status(400).json({errors: errors});
    }
    try {
        let user = await User.findOne({email});
        if (user) {
            return res
                .status(400)
                .json({errors: [{msg: 'User already exists'}]});
        }

        user = new User({email, password, name: email.split("@")[0]})

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        let userResp;
        const payload = {
            user: {
                id: user.id,
                email: user.email
            }
        };
        console.log("USER CREATED", user);

        jsonwebtoken.sign(
            payload, process.env.JWT_SECRET, {expiresIn: '5 days'}, (err, token) => {
                if (err) throw err;
                userResp = {
                    name: user.name,
                    email: user.email,
                    token,
                    role: user.role,
                    _id: user._id,
                };
                res.json({userResp});
            }
        )


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}