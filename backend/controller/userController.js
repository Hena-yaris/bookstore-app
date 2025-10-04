const pool = require("../db/db-config");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken')

// Register
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Provide all required fields" });
  }

  try {
    // Check if user exists
    const [user] = await pool.execute(
      `SELECT user_id, username FROM users WHERE username=? OR email=?`,
      [username, email]
    );

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered" });
    }

    // Password length check
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    await pool.execute(
      `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, role || "staff"]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "User created" });
  } catch (err) {
    console.error("❌ Error in register:", err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
    
  }
};


//login
const login = async (req, res) => {
    const {email,password} =req.body;
    if(!email||!password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Enter all inputs info"});
    }

  try {
    const [rows] = await pool.execute(`SELECT * FROM users WHERE email=?`, [
      email,
    ]);
    if (rows.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credential" });
    }

    //Compare password
    const isMatch = await bcrypt.compare(password, rows[0].password);

    const user = rows[0];
    if (!isMatch)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });

    // Generate JWT token
    const secret = process.env.JWT_SECRET || "sweetie";
    const token = jwt.sign(
      { userId: user.user_id, username: user.username, role: user.role },
      secret,
      { expiresIn: "1h" }
    );


    return res.status(StatusCodes.OK).json({
      msg: "User login successful",
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ Error in Login:", err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
}

};

//check
const checkUser = async (req, res) => {
    const {userId,username,role} = req.user;
  try {
    res.status(StatusCodes.OK).json({msg:'Valid user',userId,username,role});
  }  catch (err) {
  console.error("❌ Error in checking:", err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
}

};

module.exports = { register, login, checkUser };
