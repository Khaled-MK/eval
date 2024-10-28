/** @format */

const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
// const localConfig = require("../config/passport");
// const session = require("express-session");
const Users = require("../models/Users");
const Enfants = require("../models/Enfants");
const Evals = require("../models/Evals");

const router = express.Router();

const checkAuth = (req, res, next) => {
   if (!req.user) {
      req.session.returnTo = req.originalUrl;
      res.redirect("/login");
   } else {
      next();
   }
};

router.get("/", checkAuth, async (req, res) => {
   const userId = req.session.userId;
   const user = await Users.findOne({ _id: userId });
   const enf = await Enfants.find();

   const oMoy = enf[0].moyNote;
   const mMoy = enf[1].moyNote;
   res.render("index.ejs", { userNom: user.nom, userPrenom: user.prenom, userRole: user.role, omarMoy: oMoy, mayaMoy: mMoy, omarUpDate: enf[0].updatedAt, mayaUpDate: enf[1].updatedAt });
});
/*
router.get("/userAdd", (req, res) => {
   let filePath = path.join(__dirname, "../public/a.html");
   res.sendFile(filePath);
});

router.post("/userAdd", async (req, res) => {
   const hash = await bcrypt.hash(req.body.pwd, 13);

   let newUser = new Users();
   newUser.email = req.body.email;
   newUser.nom = req.body.name;
   newUser.userName = req.body.userName;
   newUser.prenom = req.body.prenom;
   newUser.role = req.body.role;
   newUser.methode = req.body.methode || "Normale";
   newUser.tel = req.body.tel;
   newUser.mdp = hash;

   await newUser.save();
   res.json("user enregistré");
});
*/
router.get("/login", (req, res) => {
   let filePath = path.join(__dirname, "../public/login.html");
   res.sendFile(filePath);
});

router.post("/login", (req, res, next) => {
   // let returnTo = req.session.returnTo;
   let reqUser = req.body.userName;
   let pass = req.body.mdp;
   // delete req.session.returnTo;

   passport.authenticate("local", async (err, user) => {
      let bddUser = await Users.findOne({ userName: reqUser });
      if (err) {
         // console.log("erreur lors de la récup du User de la bdd : ", err);
         res.json("erreur lors de la récup du User de la bdd");
      } else if (!bddUser) {
         res.json("no User");
      } else if (bddUser) {
         let isMatch = await bcrypt.compare(pass, bddUser.mdp);
         if (!isMatch) {
            res.json("mdp error");
         } else {
            req.logIn(bddUser, (err) => {
               if (err) {
                  return next(err);
               }
               req.session.userId = bddUser._id;
               return res.json("ok");
            });
         }
      }
   })(req, res, next);
});

router.get("/enfDetails/:prenom", checkAuth, async (req, res) => {
   const userId = req.session.userId;
   const user = await Users.findOne({ _id: userId });
   const enfant = await Enfants.findOne({ prenom: req.params.prenom });
   const evals = await Evals.find({ enfant: req.params.prenom });
   console.log(evals);

   res.render("enfant.ejs", { userNom: user.nom, userPrenom: user.prenom, userRole: user.role, prenom: enfant.prenom, dateN: enfant.dateN, notes: evals, moyenne: enfant.moyNote });
});

router.get("/addNote", checkAuth, async (req, res) => {
   const userId = req.session.userId;
   const user = await Users.findOne({ _id: userId });
   res.render("add.ejs", { userNom: user.nom, userPrenom: user.prenom, userRole: user.role });
});

router.post("/addNote", checkAuth, async (req, res) => {
   try {
      let newEv = new Evals();
      newEv.enfant = req.body.enfant;
      newEv.evaluateur = req.session.userId;
      newEv.classNote = req.body.classNote;
      newEv.note = req.body.note;
      newEv.discription = req.body.disc;

      await newEv.save();

      const evals = await Evals.find({ enfant: req.body.enfant });
      totalNotes = evals.reduce((acc, cur) => {
         return acc + cur.note;
      }, 0);
      newMoy = totalNotes / evals.length;
      await Enfants.updateOne(
         { prenom: req.body.enfant },
         {
            $set: { moyNote: newMoy },
         }
      );
      res.json("note enregistrée");
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
   }
});

router.get("/modEval/:id", checkAuth, async (req, res) => {
   const reqEval = await Evals.findOne({ _id: req.params.id });
   const user = await Users.findOne({ _id: req.session.userId });
   req.session.modEvalUrl = `/enfDetails/${reqEval.enfant}`;

   res.render("modNote.ejs", { userNom: user.nom, userPrenom: user.prenom, userRole: user.role, eval: reqEval });
});

router.post("/modEval", checkAuth, async (req, res) => {
   try {
      await Evals.updateOne(
         { _id: req.body.eval },
         {
            enfant: req.body.enfant,
            classNote: req.body.classNote,
            note: req.body.note,
            discription: req.body.discription,
         }
      );
      const evals = await Evals.find({ enfant: req.body.enfant });
      totalNotes = evals.reduce((acc, cur) => {
         return acc + cur.note;
      }, 0);
      newMoy = totalNotes / evals.length;
      await Enfants.updateOne(
         { prenom: req.body.enfant },
         {
            $set: { moyNote: newMoy },
         }
      );

      res.json({ etat: "eval modifié", url: req.session.modEvalUrl });
   } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      res.status(500).json({ message: "Erreur du serveur" });
   }
});

router.get("/suppEval/:id", checkAuth, async (req, res) => {
   try {
      await Enfants.updateOne({ prenom: req.params.enf }, { $pull: { notes: { id: parseFloat(req.params.id) } } });

      const enf = await Enfants.findOne({ prenom: req.params.enf });
      let totalNotes;
      let newMoy;

      if (enf.notes.length === 0) {
         newMoy = 0;
      } else {
         totalNotes = enf.notes.reduce((acc, cur) => {
            return acc + cur.note;
         }, 0);
         newMoy = totalNotes / enf.notes.length;
      }

      await Enfants.updateOne(
         { prenom: req.params.enf },
         {
            $set: { moyNote: newMoy },
         }
      );
      //ça ne marche pas
      //a revoir plutard pour mettre les 2 dans une seule requette BDD

      res.json({ etat: "eval supprimée", nvMoy: newMoy });
   } catch (err) {
      console.log("erreur lors de la suppression : ", err);
   }
});

router.get("/logout", (req, res) => {
   req.logOut();
   res.redirect("/");
});

module.exports = router;
