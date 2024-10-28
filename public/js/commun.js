/** @format */

function formatDate(x) {
   date = new Date(x);
   return (newSpanText = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`);
}

function moyStyle(moyenne, progDiv, moyP, img) {
   if (moyenne < 4) {
      progDiv.style = `background-color: rgb(220 38 38);width : ${moyenne * 10}% `;
      moyP.style = "color : rgb(220 38 38)";
      img.src = "../imgs/02_mal.png";
   } else if (moyenne >= 4 && moyenne < 7) {
      progDiv.style = `background-color: rgb(249 115 22);width : ${moyenne * 10}% `;
      moyP.style = "color : rgb(249 115 22)";
      img.src = "../imgs/03_quoi.png";
   } else if (moyenne >= 7) {
      progDiv.style = `background-color: rgb(22 163 74);width : ${moyenne * 10}% `;
      moyP.style = "color : rgb(22 163 74)";
      img.src = "../imgs/01_bien.png";
   }
}

function noteStyle(noteBar, noteSpan) {
   noteSpan.innerText = noteBar.value;
   if (noteBar.value < 4) {
      noteBar.style = "accent-color: rgb(220 38 38)";
      noteSpan.style = "color : rgb(220 38 38)";
   } else if (noteBar.value >= 4 && noteBar.value < 7) {
      noteBar.style = "accent-color: rgb(249 115 22)";
      noteSpan.style = "color : rgb(249 115 22)";
   } else if (noteBar.value >= 7) {
      noteBar.style = "accent-color: rgb(22 163 74)";
      noteSpan.style = "color : rgb(22 163 74)";
   }
}
