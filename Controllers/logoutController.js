const logout = (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
};

module.exports = logout;
