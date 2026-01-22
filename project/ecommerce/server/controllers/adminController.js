import ErrorHandler from "../middlewares/errormiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const page = Number.parseInt(req.query.page) || 1;
  const totalUsersResult = await database.query(
    "SELECT COUNT(*) FROM users WHERE role = $1 ",
    ["User"],
  );

  const totalUsers = Number.parseInt(totalUsersResult.rows[0].count);
  const offset = (page - 1) * 10;

  const users = await database.query(
    "SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
    ["User", 10, offset],
  );

  res.status(200).json({
    success: true,
    totalUsers,
    currentPage: page,
    users: users.rows,
  });
});
