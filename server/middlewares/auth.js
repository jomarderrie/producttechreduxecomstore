const admin = require("../firebase");
const User = require("../models/user");
const jwt = require("express-jwt");
const realJwt = require("jsonwebtoken");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers.authtoken); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.authenticateTokenJwtUser = (req,res,next) =>{
  const authHeader = req.headers['authorization'];
  if (authHeader==null){
    return res.status(401).json({ error: 'Try to' +
          ' login again' });
  }
  realJwt.verify(authHeader, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid' +
            ' json token' });
    }
    req.user = user.user;
    next();
  });

}

exports.adminCheck = async (req, res, next) => {
  console.log(req)
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();
  console.log(adminUser)
  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};

exports.getCurrentAdmin = async (req,res,next) =>{
    res.json("ok");
}

