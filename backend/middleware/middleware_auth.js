// Middleware to implement usage of JWT for secure authentication of access
const jwt = require("jsonwebtoken");

function jwtMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  // no token, no access
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // checks that the format of the JWT is valid
  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Invalid token format. Use Bearer <token>" });
  }
  // checks that the token itself is valid
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = { jwtMiddleware };
