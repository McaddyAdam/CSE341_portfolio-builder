const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("./src/connection/db");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const PORT = process.env.PORT;
const app = express();
const router = require("./src/routes/index");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

require("./src/configuration/passport")(passport);

app
  .use(bodyParser.json())
  .use(cors({ origin: "*" }))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(
    session({
      secret: "keyboard cat",
      cookie: {
        name: "googleToken",
        maxAge: 60000 * 60 * 24, //1Sec * 1H * 24 = 1 Day
      },
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: process.env.URI }),
    }),
  )
  //Passport
  .use(passport.initialize())
  .use(passport.authenticate("session"))
  .use("/auth", require("./src/routes/auth"))
  .use("/", router)
  .use(express.static(path.join(__dirname, "./src/public")));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Connected to DB and listening on ${PORT}`);
  }
});