/** @format */

const evalDivs = document.querySelectorAll(".evalDiv");
const enfant = document.getElementById("enfant").firstChild.nodeValue;

const moyP = document.getElementById("moyenneP");

const moyenne = parseFloat(moyP.innerText);
const bigDiv = moyP.parentElement.parentElement;
const progDiv = bigDiv.firstElementChild.firstElementChild;
const img = bigDiv.firstElementChild.nextElementSibling.firstElementChild;
const creaTimeP = document.querySelectorAll(".creaTime");
let timer;

moyStyle(moyenne, progDiv, moyP, img);

moyP.innerText = `${parseInt(moyP.innerText)} / 10`;

creaTimeP.forEach((p) => {
   p.innerText = formatDate(p.innerText);
});

evalDivs.forEach((div) => {
   div.addEventListener("mousedown", async () => {
      timer = setTimeout(async () => {
         div.lastElementChild.style = "width : 100%";
         div.classList.remove("cursor-pointer");
         div.lastElementChild.addEventListener("click", async (e) => {
            if (e.target.classList.contains("annul")) {
               div.lastElementChild.style = "width : 0%";
               div.classList.add("cursor-pointer");
            } else if (e.target.classList.contains("supprimer")) {
               try {
                  await fetch(`/suppEval/${enfant}/${div.id}`, {
                     method: "GET",
                     headers: {
                        "Content-Type": "application/json",
                     },
                  })
                     .then((response) => {
                        if (!response.ok) {
                           throw new Error(`Erreur HTTP! Statut : ${response.status}`);
                        }
                        return response.json();
                     })
                     .then((data) => {
                        if (data.etat === "eval supprimée") {
                           div.classList.remove("trans-div");
                           div.classList.add("px-3", "bg-red-600");
                           for (let i = 0; i < div.children.length; i++) {
                              div.children[i].remove();
                           }
                           const spoon = document.createElement("span");
                           spoon.classList.add("text-white", "font-semibold");
                           spoon.innerText = "Element supprimé";
                           div.append.spoon;
                           setTimeout(() => {
                              div.remove();
                           }, 1000);
                           moyP.innerText = `${parseInt(data.nvMoy)} / 10`;
                           moyStyle(data.nvMoy, progDiv, moyP, img);
                        }
                     });
               } catch (err) {
                  console.log("Erreur lors de la requette modifier eval : ", err);
               }
            } else if (e.target.classList.contains("modifier")) {
               try {
                  location.href = `/modEval/${div.id}`;
                  // await fetch(`/modEval/${enfant}/${div.id}`, {
                  //    method: "GET",
                  //    headers: {
                  //       "Content-Type": "application/json",
                  //    },
                  // })
                  //    .then((response) => {
                  //       if (!response.ok) {
                  //          throw new Error(`Erreur HTTP! Statut : ${response.status}`);
                  //       }
                  //       return response.json();
                  //    })
                  //    .then((data) => {
                  //       if (data.etat === "ok") {
                  //          location.href = data.url;
                  //       } else {
                  //          console.log("pas ok");
                  //       }
                  //    });
               } catch (err) {
                  console.log("Erreur lors de la requette de modification : ", err);
               }
            }
         });
      }, 400);
   });
   div.addEventListener("mouseup", () => {
      clearTimeout(timer);
   });
   div.addEventListener("mouseleave", () => {
      clearTimeout(timer);
   });
});
