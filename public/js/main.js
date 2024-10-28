/** @format */
const moyDivs = document.querySelectorAll(".moy-div");
const updateSpan = document.querySelectorAll(".update-span");
const enfSec = document.querySelectorAll(".enfant");

moyDivs.forEach((div) => {
   const moyenne = parseFloat(div.lastElementChild.firstElementChild.id);
   const progDiv = div.firstElementChild.firstElementChild;
   const noteSpan = div.lastElementChild.firstElementChild;
   const img = div.firstElementChild.nextElementSibling.firstElementChild;

   noteSpan.innerText = `${moyenne.toFixed(0)} / 10`;

   if (moyenne < 4) {
      progDiv.style = `background-color: rgb(220 38 38);width : ${moyenne * 10}% `;
      noteSpan.style = "color : rgb(220 38 38)";
      img.src = "./imgs/02_mal.png";
   } else if (moyenne >= 4 && moyenne < 7) {
      progDiv.style = `background-color: rgb(249 115 22);width : ${moyenne * 10}% `;
      noteSpan.style = "color : rgb(249 115 22)";
      img.src = "./imgs/03_quoi.png";
   } else if (moyenne >= 7) {
      progDiv.style = `background-color: rgb(22 163 74);width : ${moyenne * 10}% `;
      noteSpan.style = "color : rgb(22 163 74)";
      img.src = "./imgs/01_bien.png";
   }
});

updateSpan.forEach((span) => {
   span.innerText = formatDate(span.innerText);
});

enfSec.forEach((enf) => {
   enf.addEventListener("click", async () => {
      location.href = `/enfDetails/${enf.id}`;
   });
});
