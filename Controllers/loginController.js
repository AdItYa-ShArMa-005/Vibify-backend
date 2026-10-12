const User = require("../Models/userModel");
const bcrypt = require('bcrypt');
const generateAccessToken = require('../util/token');
const login = async(req,res) => {
    const {logWith,identity,password} = req.body;

    if(!identity || !password)
        return res.status(401).json({messge : "All fields reuired."});

    try{
        const user = (logWith === 'email') ? await User.findOne({email:identity}) : await User.findOne({phoneNo : identity});
        if(!user)
            return res.status(404).json({message : "No user found."});

        const pass = await bcrypt.compare(password,user.password);
        if(!pass)
            return res.status(404).json({message : "Invalid password."});

        const accessToken = generateAccessToken(user);
        res.cookie("accessToken",accessToken,
            {
                httpOnly : true,
                secure : false,
                sameSite : "strict",
                maxAge : 15*60*1000
            }
        );
        return res.status(200).json({message : `Logged in successfully with ${logWith}`});
    }
    catch(err)
    {
        return res.status(500).json({message : "Unable to connect at this moment"});
    }
};

module.exports = login;