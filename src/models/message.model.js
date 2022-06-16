const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Пожалуйста, введите название"],
    },
    message: {
        type: String,
        required: [true, "Пожалуйста, введите описание"],
    },
});

module.exports = mongoose.model("Message", MessageSchema);
