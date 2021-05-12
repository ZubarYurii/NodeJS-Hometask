const { Router } = require('express');
const UserService = require('../services/userService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.search({ email });
        if (!user || password !== user.password) {
            return res.status(401).json({
                status: "error",
                code: 401,
                data: "UNAUTHORIZED",
                message: "Invalid credentials",
            });
        }


        return res.status(200).json({
            status: "success",
            code: 200,
            user,
        });
    } catch (e) {
        next(e)
    }

});

module.exports = router;