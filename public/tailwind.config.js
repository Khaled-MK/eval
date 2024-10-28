/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
   content: ["./*.{html,js,php}"],
   theme: {
      extend: {
         width: {},
         colors: {
            marron: "rgb(176 115 106)",
            gris: "rgb(48 48 48)",
            "marron-clair": "rgb(255 233 230)",
         },
      },
   },

   variants: {
      extend: {
         fontSize: ["hover"],
         backgroundColor: ["active"],
      },
   },
   plugins: [],
};
