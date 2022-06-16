const express = require("express");
const {
    addProduct,
    removeProduct,
    getProducts,
    getOneProduct,
} = require("../controllers/message.controller");
const router = express.Router();

router.post("/add", addProduct);
router.get("/getOne", getOneProduct);
router.get("/remove", removeProduct);
router.get("/get", getProducts);
router.get("/test", (req, res) => {
    res.send("product route test success");
});

module.exports = router;
