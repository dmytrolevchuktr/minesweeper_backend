const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const users = require("./routes/users")

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = require("./config/keys.js").mongoURL;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/api/users", users);

app.listen(4000);