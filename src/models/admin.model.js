const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Пожалуйста, введите почту"],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Некорректные данные",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Пожалуйста, введите пароль"],
        minlength: 8,
    },
});

AdminSchema.pre("save", async function () {
    const admin = this;

    const salt = await bcrypt.genSalt();
    admin.password = await bcrypt.hash(admin.password, salt); // Производство гашиша
});

AdminSchema.methods.comparePassword = async function (candidatePassword) {
    const admin = this;

    return await bcrypt
        .compare(candidatePassword, admin.password)
        .catch((err) => false);
};

module.exports = mongoose.model("Admin", AdminSchema);
