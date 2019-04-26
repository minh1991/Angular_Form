const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const auth = require("./routers/auth.router");
const profile = require("./routers/profile.router");
const passport = require("passport");

const app = express();

// CORS
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT, POST, OPTIONS, DELETE, GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/user", auth);
app.use("/api/profile", profile);

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
