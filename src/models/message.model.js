const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'message'
    },
    name: {
        type: String,
        required: [true, "Имя отсутствует"],
    },
    message: {
        type: String,
        required: [true, "Сообщение отсутствует"],
    },
    time: {
        type: String,
        required: [true, "Дата отсутствует"]
    }
});

module.exports = mongoose.model("Message", MessageSchema);
