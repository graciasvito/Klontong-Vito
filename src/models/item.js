const supabase = require("../config/supabase");

module.exports = {
  getCountItem: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("item")
        .select("*", { count: "exact" })
        .then((result) => {
          if (!result.error) {
            resolve(result.count);
          } else {
            reject(result);
          }
        });
    }),
  getAllItem: (offset, limit, searchName) =>
    new Promise((resolve, reject) => {
      // page = 1
      // limit = 10
      // offset = 0
      // .range(0, 9) // offset(0) + limit(10) - 1 = 9

      if (searchName) {
        supabase
          .from("item")
          .select("*")
          .range(offset, offset + limit - 1)
          .ilike("name", searchName)
          // input query tambahan untuk sort dan search
          .then((result) => {
            if (!result.error) {
              resolve(result);
            } else {
              reject(result);
            }
          });
      } else {
        supabase
          .from("item")
          .select("*")
          .range(offset, offset + limit - 1)
          //
          // .ilike("name", searchName)
          // input query tambahan untuk sort dan search
          .then((result) => {
            if (!result.error) {
              resolve(result);
            } else {
              reject(result);
            }
          });
      }
    }),
  getItemById: (id) =>
    new Promise((resolve, reject) => {
      // SELECT * FROM Item WHERE id = "123"
      supabase
        .from("item")
        .select(`*`)
        .eq("id", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createItem: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("item")
        .insert([data]) // insert([{name: "Tea", price: 5000}])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  updateItem: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("item")
        .update(data)
        .eq("id", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
