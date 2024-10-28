/** @format */

const mongoose = require("mongoose");

const dbConnect = () => {
   mongoose
      .connect(process.env.DB_URL)
      .then((conn) => {
         console.log(`Connecté à la base de données : ${conn.connection.host}`);
      })
      .catch((err) => {
         console.error(`Erreur Base de données : ${err}`);
      });
};

module.exports = dbConnect;
