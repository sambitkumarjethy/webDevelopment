import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errormiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import database from "../database/db.js";

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, category, stock } = req.body;
  const created_by = req.user.id;

  if (!name || !description || !price || !category || !stock) {
    return next(
      new ErrorHandler("Please Provide complete product deatils.", 400)
    );
  }

  let uploadedImages = [];
  if (req.files && req.files.images) {
    const images = Array.isArray(req.files.images)
      ? req.files.images
      : [req.files.images];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "Ecommerce_Product_Iamge",
        width: 1000,
        crop: "scale",
      });

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    const product = await database.query(
      `INSERT INTO products (name , description , price, category, stock ,images, created_by) 
      VALUES( $1 , $2, $3, $4, $5,$6,$7) RETURNING * `,
      [
        name,
        description,
        price,
        category,
        stock,
        JSON.stringify(uploadedImages),
        created_by,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product: product.rows[0],
    });
  }
});

export const fetchAllProducts = catchAsyncErrors(async (req, res, next) => {
  const {
    availability,
    price,
    category,
    ratings,
    serachvalue,
    page: req_page,
  } = req.query;

  const page = parseInt(req_page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const conditions = [];
  let values = [];
  let index = 1;

  let paginationPlaceholders = {};

  if (availability === "in-stock") {
    conditions.push(` stock > 5 `);
  } else if (availability == "limited") {
    conditions.push(` stock > 0 AND stock <= 5 `);
  } else if (availability == "out-of-stock") {
    conditions.push(` stock = 0`);
  }

  if (price) {
    const [minPrice, maxPrice] = price.split("-");
  }
});
