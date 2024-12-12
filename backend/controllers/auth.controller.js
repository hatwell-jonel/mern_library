import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import StatusCodes from '../statusCode.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({error: 'User not found'});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({error: 'Password does not match'});
        }

        const token = jwt.sign({email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(StatusCodes.OK).json({token});
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
};