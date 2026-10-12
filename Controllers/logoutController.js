const logout = (req,res) => {
    const {token} = req.cookies;
    if(!token)
        return res.status(401).json({message : "User not verified"});

    res.clearCookie('token');
    return res.status(200).json({message : "User logged-out successfully"});
};

module.exports = logout;