const itemModel = require("../models/item");
const wrapper = require("../utils/wrapper");

module.exports = {
  createItem: async (request, response) => {
    try {
      // console.log(request.body);

      const {
        categoryId,
        categoryName,
        sku,
        name,
        description,
        weight,
        width,
        length,
        image,
        harga,
      } = request.body;

      // console.log(request.file);
      const setData = {
        name,
        sku,
        categoryId,
        categoryName,
        description,
        weight,
        width,
        length,
        image,
        harga,
      };

      const result = await itemModel.createItem(setData);
      console.log(result);
      return wrapper.response(
        response,
        result.status,
        "Success Create Data",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      console.log(error);
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getAllItem: async (request, response) => {
    try {
      // console.log(request.query);
      let { page, limit } = request.query;
      // const { search, sort, sortType } = request.query;
      page = +page;
      limit = +limit;

      const totalData = await itemModel.getCountItem();
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        // page, totalPage, limit, totalData
        page,
        totalPage,
        limit,
        totalData,
      };

      const offset = page * limit - limit;

      // if (sortType.toLowerCase() === "asc") {
      //   sortType = true;
      // } else {
      //   sortType = false;
      // }

      const result = await itemModel.getAllItem(offset, limit);

      return wrapper.response(
        response,
        result.status,
        "Success Get Data !",
        result.data,
        pagination
      );
    } catch (error) {
      // console.log(error);
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getItemById: async (request, response) => {
    try {
      const { id } = request.params;

      const result = await itemModel.getItemById(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }

      return wrapper.response(
        response,
        result.status,
        "Success Get Data By Id",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
