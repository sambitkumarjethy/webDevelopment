import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./errormiddleware.js";
import database from "../database/db.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource.", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  const user = await database.query(
    " SELECT * FROM users where id = $1 LIMIT 1",
    [decoded.userId]
  );
  req.user = user.rows[0];
  next();
});

export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to handle this resource`,
          403
        )
      );
    }
    next();
  };
};
