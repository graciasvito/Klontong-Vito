const supabase = require("../config/supabase");

module.exports = {
  createCategory: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("category")
        .insert(data) // insert([{name: "Tea", price: 5000}])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
          console.log(result);
        });
    }),
};
