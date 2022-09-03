const express = require("express");
const app = express();
const usersRouter = require("./routes/userRouts");

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.use("/user", usersRouter);

// exprots app
module.exports = app;
