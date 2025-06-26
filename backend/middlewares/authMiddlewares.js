import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to verify login
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).send({ success: false, message: "No token" });
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Unauthorized: Invalid token",
        });
    }
};

// Middleware to check admin role
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user || user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            });

        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware",
        });
    }
};
