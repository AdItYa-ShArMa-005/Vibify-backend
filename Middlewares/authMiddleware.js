
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const { accessToken } = req.cookies || {};

    if (!accessToken) {
        return res.status(401).json({
            message: "User not logged in."
        });
    }

    if (!process.env.SECRET_ACCESS_KEY) {
        console.error("SECRET_ACCESS_KEY is not configured.");

        return res.status(500).json({
            message: "Server authentication configuration error."
        });
    }

    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.SECRET_ACCESS_KEY
        );

        req.user = decoded;

        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Token is invalid or expired."
        });
    }
};

module.exports = auth;
