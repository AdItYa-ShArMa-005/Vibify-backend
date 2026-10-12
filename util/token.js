
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    if (!process.env.SECRET_ACCESS_KEY) {
        throw new Error("SECRET_ACCESS_KEY is not configured.");
    }

    return jwt.sign(
        {
            id: user._id.toString(),
            email: user.email,
            phoneNo: user.phoneNo
        },
        process.env.SECRET_ACCESS_KEY,
        {
            expiresIn: "10m"
        }
    );
};

module.exports = generateAccessToken;
