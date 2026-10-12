const mongoose = require('mongoose');
const connectDatabase = async() => {
    try{
        const connection = await mongoose.connect(process.env.mongodb_url);
        if(connection)
            console.log("Database connected successfully");
    }
    catch(err)
    {
        console.log({
            message : "Error connecting database",
            error : err
        });
    }
};

module.exports = connectDatabase;