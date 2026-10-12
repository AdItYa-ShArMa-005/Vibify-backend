require('dotenv').config();
const express = require('express');
const connectDatabase = require('./Database/connectDB');
const cookie = require('cookie-parser');
const authRoute = require('./Routes/authRoute');
const auth = require('./Middlewares/authMiddleware');
const logout = require('./Controllers/logoutController');
const app = express();
const PORT = process.env.BACKEND_PORT;

connectDatabase();

app.use(express.json());
app.use(cookie());
app.use(auth);
app.use('*/logout',logout);
app.use('/',authRoute);

app.listen(PORT, () => {
    console.log("Server is listening at port : ",PORT);
});