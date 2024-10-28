/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
   {
      email: {
         type: String,
         required: [true, "Email obligatoire"],
         unique: [true, "Email existe déja"],
         minlength: [4, "trop court"],
         // maxlength : [40, "trop long"]
      },
      userName: {
         type: String,
         require: [true, "userName obligatoire"],
         unique: [true, "userName doit etre unique"],
      },
      nom: String,
      prenom: String,
      role: String,
      methode: String,
      tel: String,
      mdp: {
         type: String,
         required: [true, "Mot de passe obligatoire"],
      },
   },
   {
      timestamps: true,
   }
);

const Users = mongoose.model("Users", usersSchema, "users");
module.exports = Users;
