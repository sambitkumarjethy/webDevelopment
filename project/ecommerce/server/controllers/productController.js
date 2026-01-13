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
  //Filter products by availabity
  if (availability === "in-stock") {
    conditions.push(` stock > 5 `);
  } else if (availability == "limited") {
    conditions.push(` stock > 0 AND stock <= 5 `);
  } else if (availability == "out-of-stock") {
    conditions.push(` stock = 0`);
  }

  //Filter products by price
  if (price) {
    const [minPrice, maxPrice] = price.split("-");
    if (minPrice && maxPrice) {
      conditions.push(` price BETWEEN $${index} AND $${index + 1}`);
      values.push(minPrice, maxPrice);
      index += 2;
    }
  }

  //Filter products by category
  if (category) {
    conditions.push(` category ILIKE $${index}`);
    values.push(`%$${category}%`);
    index++;
  }

  //FILTER  products by ratings
  if (ratings) {
    conditions.push(`ratings >= $${index}`);
    values.push(ratings);
    index++;
  }

  //ADD search Query
  if (serachvalue) {
    conditions.push(`p.name ILIKE $${index} OR p.description ILIKE $${index}`);
    values.push(`%$${serachvalue}%`);
    index++;
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  //GET count of filter products
  const totalproductsResult = await database.query(
    `SELECT COUNT(*) FROM products p ${whereClause}`,
    values
  );

  const totalProducts = parseInt(totalproductsResult.rows[0].count);

  paginationPlaceholders.limit = `$${index}`;
  values.push(limit);
  index++;

  paginationPlaceholders.offset = `$${index}`;
  values.push(offset);
  index++;

  //FETCH WITH REVIEWS
  const query = ` SELECT p.*, COUNT(r.id) AS review_count 
                  FROM products p 
                  LEFT JOIN reviews r ON p.id = r.id 
                  ${whereClause}
                  Group By p.id
                  ORDER BY p.created_at = DESC
                  LIMIT ${paginationPlaceholders.limit}
                  OFFSET  ${paginationPlaceholders.offset}
                  `;

  const result = await database.query(query, values);
});
