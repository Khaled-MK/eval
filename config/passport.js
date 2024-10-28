/** @format */

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/Users");
const bcrypt = require("bcrypt");

//Définition de la stratégie :
passport.use(
   new LocalStrategy(
      {
         usernameField: "userName",
      },
      async (username, password, done) => {
         try {
            const user = await Users.findOne({ username });
            if (!user) {
               return done(null, false, { message: "Utilisateur non trouvé (passport)" });
            }
            const isMatch = await bcrypt.compare(password, user.mdp);
            if (!isMatch) {
               return done(null, false, { message: "Mot de passe incorrect (passport)" });
            }
            //les message en haut seront remplacer par les messages dans la logique de login dans app.post("/login")

            return done(null, user);
         } catch (err) {
            return done(err);
         }
      }
   )
);

//chiffrer et stocker les infos necessaires dans la session
passport.serializeUser((user, done) => {
   done(null, user._id);
});

//déchiffrer les infos  la session
passport.deserializeUser(async (id, done) => {
   try {
      // console.log("Deserializing user with ID:", id);
      const user = await Users.findById(id);
      done(null, user);
   } catch (err) {
      done(err);
   }
});
