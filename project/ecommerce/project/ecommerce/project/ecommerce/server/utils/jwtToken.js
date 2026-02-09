import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, message, res) => {
  const token = jwt.sign(
    { userId: user.id, email: user.email }, // payload
    process.env.JWT_SECRET_KEY, // secret key
    { expiresIn: process.env.JWT_EXPIRES_IN } // expiry
  );

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};
