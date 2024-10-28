/** @format */

// const data = {
//    email: "hamel.vb@gmail.com",
//    name: "Hammouda",
//    userName: "Amel",
//    prenom: "Amel",
//    role: "Parent",
//    tel: "0553002550",
//    pwd: "456",
// };
const data = {
   email: "melloukimedkhaled@gmail.com",
   name: "khaled",
   userName: "Khaled",
   prenom: "khaled",
   role: "Parent",
   tel: "0560988647",
   pwd: "123",
};

window.addEventListener("load", async () => {
   await fetch("/userAdd", {
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
         // console.log(response);
         return response.json();
      })
      .then((data) => {
         console.log(data);
      });
});
