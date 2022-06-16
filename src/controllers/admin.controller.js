const Admin = require("../models/admin.model");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.send("Введите данные");
        return;
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        res.send(`Пользователь с почтой ${email} не обнаружен`);
        return;
    }

    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) {
        res.send("Неверный пароль");
        return;
    }

    res.status(StatusCodes.OK).json({ admin });
};

const saveAdmin = async (req, res) => {
    const admin = await Admin.create({ ...req.body });
    res.status(StatusCodes.CREATED).send("Успех!");
};

const getAdmin = async (req, res) => {
    const admin = await Admin.find({});
    res.send(admin);
};

module.exports = { login, getAdmin, saveAdmin };
