import ErrorHandler from "../middlewares/errormiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please provide all required fields", 400));
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
