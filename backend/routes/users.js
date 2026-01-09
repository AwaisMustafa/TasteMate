const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('favorites');

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile'
        });
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findById(req.user._id);

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile'
        });
    }
});

// @route   POST /api/users/favorites/:recipeId
// @desc    Add recipe to favorites
// @access  Private
router.post('/favorites/:recipeId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const recipe = await Recipe.findById(req.params.recipeId);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Check if already in favorites
        if (user.favorites.includes(req.params.recipeId)) {
            return res.status(400).json({
                success: false,
                message: 'Recipe already in favorites'
            });
        }

        user.favorites.push(req.params.recipeId);
        await user.save();

        res.json({
            success: true,
            message: 'Recipe added to favorites',
            data: user.favorites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error adding to favorites'
        });
    }
});

// @route   DELETE /api/users/favorites/:recipeId
// @desc    Remove recipe from favorites
// @access  Private
router.delete('/favorites/:recipeId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.favorites = user.favorites.filter(
            fav => fav.toString() !== req.params.recipeId
        );

        await user.save();

        res.json({
            success: true,
            message: 'Recipe removed from favorites',
            data: user.favorites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error removing from favorites'
        });
    }
});

// @route   GET /api/users/favorites
// @desc    Get user's favorite recipes
// @access  Private
router.get('/favorites', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('favorites');

        res.json({
            success: true,
            count: user.favorites.length,
            data: user.favorites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching favorites'
        });
    }
});

module.exports = router;
