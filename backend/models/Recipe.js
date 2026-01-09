const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Snack', 'Breakfast'],
        required: true
    },
    cuisine: {
        type: String,
        enum: ['Indian', 'Chinese', 'Italian', 'Mexican', 'Thai', 'Continental', 'Japanese', 'American'],
        default: 'Indian'
    },
    prepTime: {
        type: Number, // in minutes
        required: true
    },
    cookTime: {
        type: Number, // in minutes
        required: true
    },
    servings: {
        type: Number,
        required: true,
        default: 4
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    ingredients: [{
        name: String,
        quantity: String,
        unit: String
    }],
    instructions: [{
        step: Number,
        description: String
    }],
    nutritionInfo: {
        calories: Number,
        protein: String,
        carbs: String,
        fat: String
    },
    tags: [String],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for search functionality
recipeSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
