/** @format */

const addForm = document.getElementById("addForm");
const noteBar = document.getElementById("noteBar");
const noteSpan = document.getElementById("noteSpan");
const discInput = document.getElementById("description");
const enfLabel = document.getElementById("enfLabel");
const errDiv = document.getElementById("errDiv");

const enfH = document.getElementById("enfH");
const enfInputs = document.querySelectorAll("[name='enfant']");
const classInputs = document.querySelectorAll("[name='class']");

let notedEnfant = "omar";
let noteClass;

enfLabel.addEventListener("click", (e) => {
   if (e.target.classList.contains("gender")) {
      const labelDiv = e.target.parentElement.parentElement;
      const bigDiv = labelDiv.parentElement;
      const childs = bigDiv.children;
      for (let i = 0; i < childs.length; i++) {
         if (childs[i].classList.contains("genDiv")) {
            childs[i].classList.remove("border-b-0");
         }
      }
      labelDiv.classList.add("border-b-0");
   }
});

noteBar.addEventListener("change", () => {
   noteStyle(noteBar, noteSpan);
});

// noteBar.addEventListener("change", () => {
//    noteSpan.innerText = noteBar.value;
//    if (noteBar.value < 4) {
//       noteBar.style = "accent-color: rgb(220 38 38)";
//       noteSpan.style = "color : rgb(220 38 38)";
//    } else if (noteBar.value >= 4 && noteBar.value < 7) {
//       noteBar.style = "accent-color: rgb(249 115 22)";
//       noteSpan.style = "color : rgb(249 115 22)";
//    } else if (noteBar.value >= 7) {
//       noteBar.style = "accent-color: rgb(22 163 74)";
//       noteSpan.style = "color : rgb(22 163 74)";
//    }
// });

enfInputs.forEach((input) => {
   input.addEventListener("change", () => {
      notedEnfant = input.id;
      // console.log({ notedEnfant });
   });
});

classInputs.forEach((input) => {
   input.addEventListener("change", () => {
      noteClass = input.id;
      // console.log({ noteClass });
   });
});

addForm.addEventListener("submit", async (e) => {
   e.preventDefault();
   if (noteClass) {
      let data = {
         enfant: notedEnfant,
         classNote: noteClass,
         note: noteBar.value,
         disc: discInput.value,
      };

      try {
         await fetch("addNote", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         })
            .then((response) => {
               if (!response.ok) {
                  throw new Error(`Erreur HTTP! Statut : ${response.status}`);
               }
               return response.json();
            })
            .then((data) => {
               console.log(data);
               if (data === "note enregistrée") {
                  location.href = "/";
               } else {
                  errDiv.classList.remove("hidden");
                  errDiv.classList.add("flex");
               }
            });
      } catch (err) {
         console.log("Erreur lors de la requette : ", err);
      }
   }
});
