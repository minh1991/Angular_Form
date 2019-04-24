const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const auth = require("./routers/auth.router");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/app", auth);

// DATA BASE
mongoose.Promise = global.Promise;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDb đã chạy");
  })
  .catch(err => {
    console.log(err);
  });

// PORT
app.get("/", (req, res) => {
  return res.send("xin chào");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server đã chạy ở port ${port}`);
});
