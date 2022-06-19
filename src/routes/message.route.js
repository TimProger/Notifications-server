const express = require("express");
const {
    addMessage,
    removeMessage,
    getOneMessage,
    getMessage,
} = require("../controllers/message.controller");
const router = express.Router();

router.post("/add", addMessage);
router.get("/getOne", getOneMessage);
router.get("/remove", removeMessage);
router.get("/get", getMessage);
router.get("/test", (req, res) => {
    res.send("notifications route test success");
});

module.exports = router;
