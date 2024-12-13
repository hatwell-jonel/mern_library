import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
            unique: true,
			trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
		},
		username: {
			type: String,
			required: true,
            unique: true,
            minlength: 6,
			trim: true,
		},
		password: {
			type: String,
			required: true,
            minlength: 6,
			trim: true
		},
        role: {
			type: String,
			required: true,
            enum: ['admin', 'user'],
            default: 'user'
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const User = mongoose.model("user", userSchema);

export default User;