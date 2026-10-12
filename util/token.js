const jwt = require("jsonwebtoken")

const generateAccessToken = async(user) => {
    return jwt.sign(
        {
            id : user._id,
            email : user.email,
            phoneNo : user.phoneNo
        },
        process.env.SECRET_ACCESS_KEY,
        {
            expiresIn : "10m"
        }
    )
};

module.exports = generateAccessToken;