require("dotenv").config();
const router = require("express").Router();
const adminRouter = require("./admin.route");
const messageRouter = require("./message.route");

router.use("/admin", adminRouter);
router.use("/notifications", messageRouter);

module.exports = router;
