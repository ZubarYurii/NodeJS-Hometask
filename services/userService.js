const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    async create(user) {

        return await UserRepository.create(user);
    }

    async getUsers() {

        const users = await UserRepository.getAll();
        if (!users) {
            return;
        }
        return users;
    }

    async update(id, data) {

        const updatedUser = await UserRepository.update(id, data);

        return updatedUser;
    }

    async remove(id) {

        const removedUser = await UserRepository.delete(id);

        return removedUser;
    }

    async search(search) {

        const item = await UserRepository.getOne(search);

        return item;
    }
}

module.exports = new UserService();