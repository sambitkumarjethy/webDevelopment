import ErrorHandler from "../middlewares/errormiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";
import { generatePaymentIntent } from "../utils/generatePaymentIntent.js";

export const placeNewOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    full_name,
    state,
    city,
    country,
    address,
    pincode,
    phone,
    ordeeredItems,
  } = req.body;

  if (
    !full_name ||
    !state ||
    !city ||
    !country ||
    !address ||
    !pincode ||
    !phone ||
    !ordeeredItems
  ) {
    return next(
      new ErrorHandler("Please provide complete shipping details", 400),
    );
  }

  const items = Array.isArray(ordeeredItems)
    ? ordeeredItems
    : JSON.stringify(ordeeredItems);

  if (!items || items.length === 0) {
    return next(new ErrorHandler("No items in cart.", 400));
  }

  const productIds = items.map((item) => item.product.id);
  const { rows: products } = await database.query(
    `SELECT id,price,stock,name FROM products WHERE id = ANY($1::uuid[])`,
    [productIds],
  );

  let total_price = 0;
  const values = [];
  const placeholders = [];
  console.log(items);

  items.forEach((item, index) => {
    const product = products.find((p) => p.id === item.product.id);
    if (!product) {
      return next(
        new ErrorHandler(`Product not found for ID: ${item.product.id}`, 404),
      );
    }

    if (item.quantity > product.stock) {
      return next(
        new ErrorHandler(
          `Only ${products.stock} units available fror ${product.name}`,
        ),
      );
    }

    const itemTotal = product.price * item.quantity;
    total_price += itemTotal;

    values.push(
      null,
      product.id,
      items.quantity,
      product.price,
      item.product.images[0].url || "",
      product.name,
    );

    const offset = index * 6;
    placeholders.push(
      `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${
        offset + 5
      }, $${offset + 6})`,
    );
  });

  const tax_price = 0.05; // 5 percent tax
  const shipping_price = 10; // 10 Rs shipping
  total_price = Math.round(
    total_price + total_price * tax_price + shipping_price,
  );

  const orderResult = await database.query(
    `INSERT INTO ORDERS (buyer_id, total_price, tax_price, shipping_price) VALUES ($1,$2,$3,$4) RETURNING *`,
    [req.user.id, total_price, tax_price, shipping_price],
  );

  const orderId = orderResult.rows[0].id;

  for (let i = 0; i < values.length; i += 6) {
    values[i] = orderId;
  }

  await database.query(
    `INSERT INTO order_items (order_id,product_id,quantity,price,image,title) VALUES ${placeholders.join(", ")} RETUENING  *`,
    values,
  );

  await database.query(
    `
    INSERT INTO shipping_info (order_id, full_name, state, city, country, address, pincode, phone)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `,
    [orderId, full_name, state, city, country, address, pincode, phone],
  );

  const paymentResponse = await generatePaymentIntent(orderId, total_price);

  if (!paymentResponse.success) {
    return next(new ErrorHandler("Payment failed. Try again.", 500));
  }

  res.status(200).json({
    success: true,
    message: "Order placed successfully. Please proceed to payment.",
    paymentIntent: paymentResponse.clientSecret,
    total_price,
  });
});
