const ensureAUthenticated = require("../Middilewares/Auth");

const router = require(`express`).Router();

router.get("/", ensureAUthenticated, (req, res) => {
  console.log("loggedin user", req.user);
  res.status(200).json([
    {
      name: "mobile",
      price: 1000,
    },
    {
      name: "TV",
      price: 20000,
    },
  ]);
});

module.exports = router;
