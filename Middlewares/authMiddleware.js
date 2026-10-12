const jwt = require('jsonwebtoken');
const auth = async(req,res) => {
    const {accessToken} = req.cookies;
    if(!accessToken)
        return res.status(404).json({message : "User not logged-in"});

    try{
        const decoded = jwt.verify(accessToken,process.env.SECRET_ACCESS_KEY);
        req.user = decoded;
    }
    catch(err)
    {
        return res.status(401).json({message : "Token either invalid or expired"});
    }
};
module.exports = auth;