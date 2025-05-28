const dotenv = require('dotenv');
dotenv.config();


const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // use env in prod
    req.user = decoded; // store user info in request
    next(); // proceed to the next middleware/route
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
