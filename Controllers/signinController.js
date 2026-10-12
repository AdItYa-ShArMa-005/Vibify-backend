
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

const signin = async (req, res) => {
    const { firstName, lastName, email, phoneNo, password } = req.body;

    if (
        !firstName?.trim() ||
        !email?.trim() ||
        phoneNo === undefined ||
        phoneNo === null ||
        phoneNo === "" ||
        !password
    ) {
        return res.status(400).json({
            message: "All required fields must be provided."
        });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = Number(phoneNo);

    if (
        !Number.isSafeInteger(normalizedPhone) ||
        normalizedPhone <= 0
    ) {
        return res.status(400).json({
            message: "Please provide a valid phone number."
        });
    }

    try {
        const existingUser = await User.findOne({
            $or: [
                { email: normalizedEmail },
                { phoneNo: normalizedPhone }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email or phone number."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName: firstName.trim(),
            lastName: lastName?.trim() || "",
            email: normalizedEmail,
            phoneNo: normalizedPhone,
            password: hashedPassword
        });

        const safeUser = {
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phoneNo: newUser.phoneNo
        };

        return res.status(201).json({
            message: "User added successfully.",
            new_user: safeUser
        });
    } catch (err) {
        console.error("Registration error:", err);

        if (err.code === 11000) {
            return res.status(409).json({
                message: "Email or phone number already exists."
            });
        }

        return res.status(500).json({
            message: "Unable to process registration at this moment."
        });
    }
};

module.exports = signin;
