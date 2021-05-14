const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    async create(fighter) {

        return await FighterRepository.create(fighter);
    }

    async getFighters() {

        const fighters = await FighterRepository.getAll();
        if (!fighters) {
            return;
        }
        return fighters;
    }

    async update(id, data) {

        const updatedFighter = await FighterRepository.update(id, data);

        return updatedFighter;
    }

    async remove(id) {

        const removedFighter = await FighterRepository.delete(id);

        return removedFighter;
    }

    async search(search) {

        const item = await FighterRepository.getOne(search);

        return item;
    }
}


module.exports = new FighterService();