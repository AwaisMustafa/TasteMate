const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    avatar: {
        type: String,
        default: 'https://api.dicebear.com/7.x/initials/svg?seed=User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate avatar based on username
userSchema.pre('save', function (next) {
    if (!this.avatar || this.avatar.includes('dicebear.com/7.x/initials')) {
        this.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${this.username}`;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
