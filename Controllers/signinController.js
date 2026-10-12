const User = require("../Models/userModel");
const bcrypt = require('bcrypt');
const signin = async(req,res) => {
    const {firstName,lastName,email,phoneNo,password} = req.body;

    if(!firstName || !email || !phoneNo || !password)
        return res.status(401).json({message : "All fields are required"});

    try{
        const user = await User.findOne({$or : [{email : email}, {phoneNo : phoneNo}]});
        // const user = await User.findOne({email : email, phoneNo : phoneNo});
        if(user)
            return res.status(404).json({message : "User already exist with phone number or email"});

        const hashedPass = await bcrypt.hash(password,10);
        const newUser = await User.create({
            firstName : firstName,
            lastName : lastName || "",
            email : email,
            phoneNo : phoneNo,
            password : hashedPass
        });
        if(newUser)
            return res.status(201).json({message : "User added successfully",new_user : newUser});
    }
    catch(err)
    {
        return res.status(500).json({message : "Unable to process request at this moment.",
            error : err
        });
    }
}

module.exports = signin;