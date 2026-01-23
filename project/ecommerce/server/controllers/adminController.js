import ErrorHandler from "../middlewares/errormiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";

import { v2 as cloudinary } from "cloudinary";

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

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const deleteUser = await database.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id],
  );

  if (deleteUser.rows.length === 0) {
    return next(new ErrorHandler("User not found", 404));
  }

  const avtar = deleteUser.rows[0].avtar;
  if (avtar?.public_id) {
    await cloudinary.uploader.destroy(avtar.public_id);
  }
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const dashboardStats = catchAsyncErrors(async (req, res, next) => {});
