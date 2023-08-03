const categoryModel = require("../models/category");
const wrapper = require("../utils/wrapper");

module.exports = {
  createCategory: async (request, response) => {
    try {
      // console.log(request.body);

      const { categoryName } = request.body;

      // console.log(request.file);
      const setData = {
        categoryName,
      };

      const result = await categoryModel.createCategory(setData);
      console.log(result);

      return wrapper.response(
        response,
        result.status,
        "Success Create Category",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      // console.log(error);
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
