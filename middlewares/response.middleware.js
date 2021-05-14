const responseMiddleware = (req, res, next) => {
    // TODO: Implement middleware that returns result of the query
    if (req.body) {
        return req.body;
    } else {
        const error = {
            error: true,
            message: "User entity to create isn't valid"
        };
        return error;
    }
    next();
}

exports.responseMiddleware = responseMiddleware;