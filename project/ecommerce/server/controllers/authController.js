import ErrorHandler from "../middlewares/errormiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";
import { generateResetPasswordToken } from "../utils/generateResetPasswordToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateEmailTemplate } from "../utils/generateForgotPasswordEmailTemplate.js";
import crypto from "crypto";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 or 16 cahrectors.", 400)
    );
  }

  const isAlreayRegisted = await database.query(
    `SELECT * FROM users where email = $1 `,
    [email]
  );

  if (isAlreayRegisted.rows.length > 0) {
    return next(
      new ErrorHandler("User already registered with this email", 400)
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await database.query(
    ` INSERT INTO users (name,email,password) values($1, $2,$3) RETURNING *`,
    [name, email, hashedPassword]
  );
  sendToken(user.rows[0], 201, "User Registered successfuly", res);
});
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password.", 400));
  }

  const user = await database.query(`SELECT * FROM users where email = $1`, [
    email,
  ]);

  if (user.rowCount.length === 0) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  sendToken(user.rows[0], 201, "User logged In successfuly", res);
});
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    success: true,
    user,
  });
});
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Loggedout successfully.",
    });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const { frontendUrl } = req.query;

  let userResult = await database.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (userResult.rows.length === 0) {
    return next(new ErrorHandler("Invalid Email.", 404));
  }

  const user = userResult.rows[0];

  const { hashedToken, resetPasswordExpireTime, resetToken } =
    generateResetPasswordToken();

  await database.query(
    `UPDATE users SET 
                          reset_password_token = $1, 
                          reset_password_expire = to_timestamp($2) 
                          WHERE
                          email =$3`,
    [hashedToken, resetPasswordExpireTime / 1000, email]
  );

  const resetPasswordURl = `${frontendUrl}/password/reset/${resetToken}`;

  const message = generateEmailTemplate(resetPasswordURl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfuly.`,
    });
  } catch (error) {
    console.log(error);
    await database.query(
      `UPDATE users SET 
                          reset_password_token = $1, 
                          reset_password_expire = NULL
                          WHERE
                          email =$1`,
      [email]
    );

    return next(new ErrorHandler("Email could not be sent.", 500));
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmpassword } = req.body;
  const reset_password_token = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await database.query(
    "SELECT * FROM users WHERE reset_password_token  = $1 AND reset_password_expire > NOW()",
    [reset_password_token]
  );

  if (user.rows.length === 0) {
    return next(new ErrorHandler("Invalid or expired reset token.", 400));
  }

  if (password !== confirmpassword) {
    return next(new ErrorHandler("Password donot match.", 400));
  }
  if (
    password?.length < 8 ||
    password?.length > 16 ||
    confirmpassword?.length < 8 ||
    confirmpassword?.length > 16
  ) {
    return next(
      new ErrorHandler("Password must be between 8 or 16 cahrectors.", 400)
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await database.query(
    `UPDATE users SET password = $1,
    reset_password_token = NULL, 
    reset_password_expire = NULL
    WHERE id= $2 
    RETURNING *`,
    [hashedPassword, user.rows[0].id]
  );
  sendToken(updatedUser.rows[0], 200, "Password Reset Successfully", res);
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please Provide all required fields", 400));
  }
  const isPasswordMatch = await bcrypt.compare(
    currentPassword,
    req.user.password
  );

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Current password is incorrect.", 401));
  }

  if (newPassword !== confirmNewPassword) {
    return next(new ErrorHandler("New Password do not match.", 400));
  }

  if (
    newPassword?.length < 8 ||
    newPassword?.length > 16 ||
    confirmNewPassword?.length < 8 ||
    confirmNewPassword?.length > 16
  ) {
    return next(
      new ErrorHandler("Password must be between 8 or 16 cahrectors.", 400)
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await database.query("UPDATE users SET password = $1 WHERE id = $2", [
    hashedPassword,
    req.user.id,
  ]);

  res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});
