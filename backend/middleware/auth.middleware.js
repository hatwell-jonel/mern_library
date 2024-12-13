import jwt from 'jsonwebtoken';
import statusCode from '../statusCode.js';
import User from "../models/user.model.js";


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(statusCode.UNAUTHORIZED).send('No Token, Access Denied.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(statusCode.UNAUTHORIZED).send('User not found.');
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(statusCode.UNAUTHORIZED).send('Invalid Token.');
    }
}

export default authMiddleware;