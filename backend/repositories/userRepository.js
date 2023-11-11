const UserModel = require("../models/User");

class UserRepository {
  static async save(user) {
    const userModel = new UserModel(user);

    return await userModel.save();
  }
}

module.exports = UserRepository;
