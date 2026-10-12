
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../util/token");

const login = async (req, res) => {
    const { logWith, identity, password } = req.body;

    if (
        !identity ||
        !password ||
        !["email", "phoneNo"].includes(logWith)
    ) {
        return res.status(400).json({
            message: "Valid login method, identity and password are required."
        });
    }

    try {
        const query =
            logWith === "email"
                ? { email: identity }
                : { phoneNo: identity };

        const user = await User.findOne(query);

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid credentials."
            });
        }

        const accessToken = generateAccessToken(user);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 10 * 60 * 1000
        });

        return res.status(200).json({
            message: `Logged in successfully with ${logWith}`
        });
    } catch (err) {
        console.error("Login error:", err);

        return res.status(500).json({
            message: "Unable to process login at this moment."
        });
    }
};

module.exports = login;
