import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import statusCode from '../statusCode.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(statusCode.UNAUTHORIZED).json({error: 'User not found'});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(statusCode.UNAUTHORIZED).json({error: 'Password does not match'});
        }

         // Generate the JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the token in response with a success message
        return res.status(statusCode.OK).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
};