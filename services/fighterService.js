const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    // TODO: Implement methods to work with user
    async create(fighter) {

        return await FighterRepository.create(fighter);
    }

    async getFighters() {

        const fighters = await FighterRepository.getAll();
        if (!fighters) {
            return null;
        }
        return fighters;
    }

    async update(id, data) {

        const updatedUser = await FighterRepository.update(id, data);

        return updatedUser;
    }

    async remove(id) {

        const removedUser = await FighterRepository.delete(id);

        return removedUser;
    }

    async search(search) {

        const item = await FighterRepository.getOne(search);

        return item;
    }
}


module.exports = new FighterService();