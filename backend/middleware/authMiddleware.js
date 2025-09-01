const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId, username, role } = jwt.verify(
      token,
      process.env.JWT_SECRET || "sweetie"
    );
    req.user = { userId, username, role }; // attach user info to request
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid!" });
  }
};

module.exports = authMiddleware;
