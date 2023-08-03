const bcrypt = require("bcrypt");
const authModel = require("../models/auth");
const wrapper = require("../utils/wrapper");

module.exports = {
  register: async (request, response) => {
    try {
      const { username, email, password } = request.body;
      const checkEmail = await authModel.getUserByEmail(email);
      const hashedPassword = await bcrypt.hash(password, 10);
      const setData = {
        username,
        email,
        password: hashedPassword,
        role: "user",
      };

      // checking email in database

      if (checkEmail.data.length > 0) {
        return wrapper.response(
          response,
          400,
          "Email is Already Registered",
          null
        );
      }
      // save data by model
      await authModel.createUser(setData);
      return wrapper.response(
        response,
        200,
        "Success Register, You Can Login Now"
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
  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      // check email in database
      const checkEmail = await authModel.getUserByEmail(email);
      if (checkEmail.data.length < 1) {
        return wrapper.response(response, 404, "Email Not Registed", null);
      }

      // response to user
      const result = {
        userId: checkEmail.data[0].userId,
      };
      // compare input password with password in database
      bcrypt.compare(password, checkEmail.data[0].password, (err, same) => {
        if (same) {
          return wrapper.response(response, 200, "Success Login", result);
        }
        return wrapper.response(response, 400, "Wrong Password", null);
      });
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  logout: async (request, response) => {
    try {
      return wrapper.response(response, 200, "Success Logout", null);
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
