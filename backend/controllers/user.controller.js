import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import StatusCodes from '../statusCode.js';

export const createUser = async (req, res) => {
    try {
        const { email, username, password, role } = req.body;
        const checkExistingEmail = await User.findOne({email});
        if(checkExistingEmail) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: 'Email already exists'});  
        }

        const checkExistingUsername = await User.findOne({ username });
        if (checkExistingUsername) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            role,
            password: hashedPassword
        });
        res.status(StatusCodes.CREATED).json({message: "User created successfully."})
    
} catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({error: 'User not found'});
        }
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({error: 'User not found'});
        }

        const { email, username, password, role } = req.body;

        if(email) {
            user.email = email;
        }

        if(username) {
            user.username = username;
        }

        if(password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        if(role) {
            user.role = role;
        }

        await user.save();
        res.status(StatusCodes.OK).json({message: 'User updated successfully.'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({error: 'User not found'});
        }
        await user.remove();
        res.status(StatusCodes.NO_CONTENT).json({message: 'User deleted successfully.'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};