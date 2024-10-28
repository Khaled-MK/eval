/** @format */

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const passport = require("passport");
const localConfig = require("./config/passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const morgan = require("morgan");
const dbConnect = require("./config/db.js");
const routes = require("./routes/routes.js");
const Users = require("./models/Users.js");

// dotenv.config({ path: ".env" });
const port = process.env.PORT || 3000;

const app = express();

if (process.env.Node_Env === "dev") {
   app.use(morgan("dev"));
   console.log("mode: ", process.env.Node_Env);
}

console.log("db_url 2 :", process.env.DB_URL);

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
   session({
      store: MongoStore.create({ mongoUrl: process.env.DB_URL }),

      secret: process.env.Session_Secret,
      saveUninitialized: false,
      resave: false,
      cookie: {
         secure: false, // a mettre true en https
         httpOnly: true,
         maxAge: 1000 * 60 * 30,
      },
   })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
   console.log(`serveur connecté sur le port ${port}`);
});
