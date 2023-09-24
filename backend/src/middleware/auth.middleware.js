require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyUser = async (req, res, next) => {
  const token = req.cookies.JWT_TOKEN;
  if (!token) {
    return res.status(403).json({ message: "Token is NOT provided!" });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      } else {
        const resObject = {
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        };
        return res.status(200).json(resObject);
        next();
      }
    });
  }
};
module.exports = verifyUser;
