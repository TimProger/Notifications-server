const Product = require("../models/message.model");
const { StatusCodes } = require("http-status-codes");

const addProduct = async (req, res) => {
    let { title } = req.body;
    let product = await Product.findOne({ title: title });
    let newProduct;
    if (product) {
        res.status(StatusCodes.NOT_ACCEPTABLE).send(
            "Продукт с таким названием уже существует"
        );
        return;
    }
    if (
        !req.body.image ||
        req.body.image.split("").length < 1 ||
        req.body.image === "-"
    ) {
        newProduct = await Product.create({ ...req.body, image: "" });
    } else {
        newProduct = await Product.create({ ...req.body });
    }
    res.status(StatusCodes.CREATED).send("Товар успешно добавлен");
};

const removeProduct = async (req, res) => {
    const { title } = req.query;
    if (!title) {
        res.send("Введите название");
        return;
    }
    const { id } = await Product.findOne({ title: title });
    if (!id) {
        res.send("Товар не найден");
        return;
    }
    await Product.deleteOne({ _id: id });
    res.status(StatusCodes.OK).send("Успех!");
};

const getOneProduct = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.send("Пожалуйста введите id");
        return;
    }
    const product = await Product.findOne({ _id: id });
    if (!id) {
        res.send("Не найдено");
        return;
    }
    res.status(StatusCodes.OK).json({ product });
};

const getProducts = async (req, res) => {
    const product = await Product.find({});
    res.send(product);
};

module.exports = { addProduct, removeProduct, getProducts, getOneProduct };
