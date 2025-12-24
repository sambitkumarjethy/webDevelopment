const { signup } = require("../Controllers/AuthController");
const { signupValidation } = require("../Middilewares/AuthValidation");

const router = require(`express`).Router();
router.post("/login", () => {
  res.send("Login Success");
});
router.post("/signup", signupValidation, signup);

module.exports = router;
