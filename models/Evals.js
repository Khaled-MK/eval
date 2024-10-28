/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evalSchema = new Schema(
   {
      enfant: String,
      evaluateur: String,
      classNote: String,
      note: Number,
      description: String,
   },
   {
      timestamps: true,
   }
);

const Evals = mongoose.model("Evals", evalSchema, "evals");
module.exports = Evals;
