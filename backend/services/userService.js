class UserService {
  static useRepository(repository) {
    this.repository = repository;
  }

  static async create(user) {
    const newUser = await this.repository.save({
      ...user,
      dateCreated: new Date(),
    });

    return newUser;
  }
}

module.exports = UserService;
