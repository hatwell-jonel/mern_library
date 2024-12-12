import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
		},
		username: {
			type: String,
			required: true,
            unique: true,
            minlength: 6,
		},
		password: {
			type: String,
			required: true,
            minlength: 6
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

// Pre-save middleware to hash passwords
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("user", userSchema);

export default User;