const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', async (req, res, next) => {
    try {
        const users = await UserService.getUsers();

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
        const user = await UserService.search({ id });
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
        const { email, name, phoneNumber } = user

        if (await UserService.search({ email })) {
            return res.status(403).json({
                status: 'forbiden',
                code: 403,
                data: {
                    message: 'Email already exist'
                }
            })
        }

        if (await UserService.search({ name })) {
            return res.status(403).json({
                status: 'forbiden',
                code: 403,
                data: {
                    message: 'Name already exist'
                }
            })
        }

        if (await UserService.search({ phoneNumber })) {
            return res.status(403).json({
                status: 'forbiden',
                code: 403,
                data: {
                    message: 'PhoneNumber already exist'
                }
            })
        }

        const result = await UserService.create(user);

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
        const user = UserService.update(id, data);
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
                message: "user updated successfully"
            },
        })

    } catch (e) {
        next(e)
    }
});


router.delete('/:id', (req, res, next) => {

    try {
        const id = req.params.id;
        const user = UserService.remove(id);
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