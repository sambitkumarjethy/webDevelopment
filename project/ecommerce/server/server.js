import app from "./app.js";
app.listen(process.env.PORT, () => {
  console.log(`sever is running on port ${process.env.PORT}`);
});
