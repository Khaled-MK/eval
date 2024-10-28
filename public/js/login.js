/** @format */

const loginForm = document.getElementById("loginForm");
const userName = document.getElementById("userName");
const mdp = document.getElementById("mdp");
const subBtn = document.getElementById("submit");
const mdpDiv = document.getElementById("mdpDiv");
const showMdp = document.getElementById("showMdp");
const eye = document.getElementById("eye");
const userErr = document.getElementById("userErr");
const mdpErr = document.getElementById("mdpErr");
const mainDiv = document.getElementById("mainDiv");

userErr.classList.add("hidden");
mdpErr.classList.add("hidden");

showMdp.addEventListener("click", () => {
   if (showMdp.classList.contains("off")) {
      mdp.type = "text";
      eye.src = "./imgs/showMdpOn.svg";
      showMdp.classList.remove("off");
   } else {
      mdp.type = "password";
      eye.src = "./imgs/showMdpOff.svg";
      showMdp.classList.add("off");
   }
});

loginForm.addEventListener("submit", async (e) => {
   e.preventDefault();
   mdp.type = "password";
   const infos = {
      userName: userName.value,
      mdp: mdp.value,
   };

   if ((userName.value !== "") & (mdp.value !== "")) {
      try {
         await fetch("login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(infos),
         })
            .then((response) => {
               if (!response.ok) {
                  throw new Error(`Erreur HTTP! Statut : ${response.status}`);
               }
               return response.json();
            })
            .then((data) => {
               // console.log("data : ", data);

               if (data === "erreur lors de la récup du User de la bdd") {
                  userErr.classList.remove("hidden");
                  userName.classList.add("border-red-600");
                  userErr.innerText = "Erreur lors de la récupération du User de la Base de données";
                  userName.addEventListener("focus", () => {
                     userName.classList.remove("border-red-600");
                     userErr.classList.add("hidden");
                  });
               } else if (data === "no User") {
                  userErr.classList.remove("hidden");
                  userName.classList.add("border-red-600");
                  userErr.innerText = "Utilisateur non trouvé";
                  userName.addEventListener("focus", () => {
                     userName.classList.remove("border-red-600");
                     userErr.classList.add("hidden");
                  });
               } else if (data === "mdp error") {
                  mdpErr.classList.remove("hidden");
                  mdpDiv.classList.add("border-red-600");

                  mdp.addEventListener("focus", () => {
                     mdpDiv.classList.remove("border-red-600");
                     mdpErr.classList.add("hidden");
                  });
               } else if (data === "ok") {
                  console.log(data);
                  location.href = "/";
               } else {
                  console.log("erreur inconnue");
               }
            });
      } catch (err) {
         console.log("Erreur lors de la requette : ", err);
      }
   }
});
