const jwt = require("jsonwebtoken");
const { ENV } = require("../utils/constants");

const validateToken = token => {
    try {
        const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
        return decodedToken;
    } catch (error) {}
};

module.exports.bearerAuth = (req, res, next) => {
    const tokenType = "Bearer";
    const {
        headers: { authorization },
    } = req;
    if (!authorization || !authorization.includes(tokenType)) {
        return res.status(401).send({ message: "Please provide authentication token", success: false });
    }

    const token = authorization.replace(`${tokenType} `, "");

    const decodedToken = validateToken(token);
    if (!decodedToken) return res.status(401).send({ message: "Unauthorized", success: false });

    req.user = decodedToken;
    next();
};
