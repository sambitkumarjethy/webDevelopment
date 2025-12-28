const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CONN;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log(`MongoDB connceted`);
  })
  .catch((error) => {
    console.log(`MongoDB Connection Error:`, console.error());
  });
