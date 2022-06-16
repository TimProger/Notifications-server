require("dotenv").config();
require("express-async-errors");
const express = require("express");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const router = require("./routes/router");
const PORT = process.env.PORT || 8080;
const dbUri = process.env.dbURI;

const app = express();

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 минут
        max: 500,
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
    })
);

app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(express.json());
app.use(helmet());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
        ],
        methods: ["GET", "POST"],
        optionsSuccessStatus: 200,
    })
);
app.use(xss());

app.get("/", (req, res) => {
    res.send("Hello Server");
});

app.use("/api/v1/", router);

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    try {
        await mongoose.connect(dbUri);
        console.log("DB connected");
    } catch (error) {
        console.log("Could not connect to DB");
        process.exit(1);
    }
});
