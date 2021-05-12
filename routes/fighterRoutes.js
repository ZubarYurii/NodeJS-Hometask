const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', async (req, res, next) => {
    try {
        const users = await FighterService.getUsers();

        if (users.length === 0) {
            return res.status(404).json({
                status: "error",
                code: 404,
                data: "Not found",
                message: "Users not found",
            });
        }
        return res.status(200).json({
            status: "success",
            code: 200,
            data: {
                users
            },

        });
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await FighterService.search({ id });
        if (!user) {
            return res.status(404).json({
                status: "error",
                code: 404,
                data: "Not found",
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: "success",
            code: 200,
            data: {
                user
            },

        });
    } catch (e) {
        next(e)
    }

});


router.post('/', async (req, res, next) => {
    try {
        const user = req.body
        const result = await FighterService.create(user);

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
        const user = FighterService.update(id, data);
        if (!user) {
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
                user,
            },
        })

    } catch (e) {
        next(e)
    }
});


router.delete('/:id', (req, res, next) => {

    try {
        const id = req.params.id;
        const user = FighterService.remove(id);
        if (!user) {

            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'User not Found',
            })
        }

        return res.json({
            status: 'success',
            code: 200,
            message: 'user deleted successfully'
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router;