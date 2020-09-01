const express = require("express");
const cors = require("cors");
const app = express();

// Settings

app.set("port", process.env.PORT || 4000);

// Middlewares

app.use(cors());
app.use(express.json());

// Routes

app.use("/api/doctores", require("./routes/doctors"));
app.use("/api/usuarios", require("./routes/users"));

module.exports = app;
