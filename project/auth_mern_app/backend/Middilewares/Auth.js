const jwt = require("jsonwebtoken");
const ensureAUthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({ message: "JWT token required!" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unautherized, JWT roken wrong or expired!" });
  }
};
module.exports = ensureAUthenticated;
