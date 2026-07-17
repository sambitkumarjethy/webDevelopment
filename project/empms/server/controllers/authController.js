import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(404)
        .json({ success: false, error: "User or password Invalid" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
    );
    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.log(error.message);
  }
};
export { login };
