const User = require("../models/user");

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

exports.createUser = async (req, res) => {
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let errors = []
    let password = req.body.password;
    let email = req.body.email;

    if (passwordRegex.exec(password) == null) {
        errors.push("Password is incorrect");
    }
    if (emailRegex.exec(email) == null) {
        errors.push("Email is incorrect");
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res
                .status(400)
                .json({errors: [{msg: 'Invalid Credentials'}]});
        }

        const isMatch = await bcrypt.compar(password, password);
        if (!isMatch) {
            return res
                .status(400)
                .json({errors: [{msg: 'Invalid Credentials'}]});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        // const newUser = await new User({
        //     email,
        //     name: email.split("@")[0],
        //     picture,
        // }).save();
        // console.log("USER CREATED", newUser);
        // res.json(newUser);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    console.log(req.body)
    console.log(passwordRegex.exec(req.body.password));
    ;
    console.log(emailRegex.exec(req.body.email))
    res.json("good")

}