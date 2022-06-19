const MessageModel = require("../models/message.model");
const { StatusCodes } = require("http-status-codes");

const addMessage = async (req, res) => {
    let { name, message } = req.body;
    let newMessage = await MessageModel.create({ name, message });
    res.status(StatusCodes.CREATED).send("Сообщение успешно добавлено");
};

const removeMessage = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.send("Пожалуйста введите id");
        return;
    }
    const message = await MessageModel.findOne({ _id: id });
    if (!message) {
        res.send("Товар не найден");
        return;
    }
    await MessageModel.deleteOne({ _id: id });
    res.status(StatusCodes.OK).send("Успех!");
};

const getOneMessage = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.send("Пожалуйста введите id");
        return;
    }
    const message = await MessageModel.findOne({ _id: id });
    if (!message) {
        res.send("Не найдено");
        return;
    }
    res.status(StatusCodes.OK).json({ message });
};

const getMessage = async (req, res) => {
    const messages = await MessageModel.find({});
    res.send(messages);
};

module.exports = { addMessage, removeMessage, getOneMessage, getMessage };
