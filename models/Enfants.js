/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enfsSchema = new Schema(
   {
      prenom: String,
      dateN: Date,
      moyNote: Number,
   },
   {
      timestamps: true,
   }
);

const Enfants = mongoose.model("Enfants", enfsSchema, "enfants");
module.exports = Enfants;
