require("dotenv").config();
const router = require("express").Router();
const adminRouter = require("./admin.route");
const productRouter = require("./product.route");

router.use("/admin", adminRouter);
router.use("/message", productRouter);

module.exports = router;
