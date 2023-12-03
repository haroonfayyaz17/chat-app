const jwt = require("jsonwebtoken");

module.exports.bearerAuth = (req, res, next) => {
    const { headers } = req;
    if (!headers.authorization || !headers.includes("Bearer")) {
        return res.status(401).send({ message: "Unauthorized", success: false });
    }

    next();
};
