const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = AuthService.login({ email })
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