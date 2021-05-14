const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', async (req, res, next) => {
    try {
        const fighters = await FighterService.getFighters();

        if (fighters.length === 0) {
            return res.status(404).json({
                status: "error",
                code: 404,
                data: "Not found",
                message: "Fighters not found",
            });
        }
        return res.status(200).json({
            status: "success",
            code: 200,
            data: {
                fighters
            },

        });
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const fighter = await FighterService.search({ id });
        if (!fighter) {
            return res.status(404).json({
                status: "error",
                code: 404,
                data: "Not found",
                message: "Fighter not found",
            });
        }
        return res.status(200).json({
            status: "success",
            code: 200,
            data: {
                fighter
            },

        });
    } catch (e) {
        next(e)
    }

});


router.post('/', async (req, res, next) => {
    try {
        const fighter = req.body
        const { name } = fighter

        if (await FighterService.search({ name })) {
            return res.status(403).json({
                status: 'forbiden',
                code: 403,
                data: {
                    message: 'Name already exist'
                }
            })
        }

        const result = await FighterService.create(fighter);

        return res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result,
            },
        })
    } catch (e) {
        next(e)
    }

});


router.put('/:id', async (req, res, next) => {

    try {
        const id = req.params.id;
        const data = req.body;
        const fighter = FighterService.update(id, data);
        if (!fighter) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Not Found',
            })
        }
        return res.json({
            status: 'success',
            code: 200,
            data: {
                fighter,
            },
        })

    } catch (e) {
        next(e)
    }
});


router.delete('/:id', (req, res, next) => {

    try {
        const id = req.params.id;
        const fighter = FighterService.remove(id);
        if (!fighter) {

            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Fighter not Found',
            })
        }

        return res.json({
            status: 'success',
            code: 200,
            message: 'Fighter deleted successfully'
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router;