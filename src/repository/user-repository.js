const { User, Role } = require("../models/index");
const ClientError = require("../utils/client-error");
const ValidationError = require("../utils/validation-error");
const { StatusCodes } = require("http-status-codes");
class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        // console.log('createing validation error');
        // let validationError=new ValidationError(error);
        // console.log(validationError);
        throw new ValidationError(error);
      }
      console.log("Something Went Wrong In Repo Layer");
      console.log(error);
    }
  }
  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something Went Wrong In Repo Layer");
      console.log(error);
    }
  }
  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"], //to get specific attributes
      });
      return user;
    } catch (error) {
      console.log("Something Went Wrong In Repo Layer");
      console.log(error);
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid Email Sent in the Request",
          "Please Check the email no user found with this email",
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("Something Went Wrong In Repo Layer");
      console.log(error);
    }
  }
  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      onsole.log("Something Went Wrong In Repo Layer");
      console.log(error);
      throw { error };
    }
  }
}

module.exports = UserRepository;
