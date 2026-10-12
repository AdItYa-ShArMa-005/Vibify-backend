
require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const connectDatabase = require("./Database/connectDB");
const authRoute = require("./Routes/authRoute");
const auth = require("./Middlewares/authMiddleware");
const logout = require("./Controllers/logoutController");

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Public routes: registration and login
app.use("/", authRoute);

// Protected route: logout
app.post("/logout", auth, logout);

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server is listening at port: ${PORT}`);
        });
    } catch (err) {
        console.error("Unable to start server:", err);
        process.exit(1);
    }
};

startServer();
