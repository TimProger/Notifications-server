const express = require("express");
const {
    login,
    getAdmin,
    saveAdmin,
} = require("../controllers/admin.controller");
const router = express.Router();

router.post("/login", login);
router.get("/get", getAdmin);
router.post("/save", saveAdmin);
router.get("/test", (req, res) => {
    res.send("admin route test success");
});

module.exports = router;
