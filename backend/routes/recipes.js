const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// @route   GET /api/recipes
// @desc    Get all recipes with optional filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, cuisine, difficulty, search, featured } = req.query;
        let query = {};

        if (category) query.category = category;
        if (cuisine) query.cuisine = cuisine;
        if (difficulty) query.difficulty = difficulty;
        if (featured) query.featured = true;
        if (search) {
            query.$text = { $search: search };
        }

        const recipes = await Recipe.find(query)
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching recipes'
        });
    }
});

// @route   GET /api/recipes/:id
// @desc    Get single recipe by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate('reviews.user', 'username avatar');

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        res.json({
            success: true,
            data: recipe
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching recipe'
        });
    }
});

// @route   GET /api/recipes/featured/list
// @desc    Get featured recipes
// @access  Public
router.get('/featured/list', async (req, res) => {
    try {
        const recipes = await Recipe.find({ featured: true })
            .limit(6)
            .sort({ rating: -1 });

        res.json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching featured recipes'
        });
    }
});

// @route   POST /api/recipes/:id/review
// @desc    Add a review to a recipe
// @access  Private
router.post('/:id/review', auth, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Check if user already reviewed
        const alreadyReviewed = recipe.reviews.find(
            r => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this recipe'
            });
        }

        const review = {
            user: req.user._id,
            rating: Number(rating),
            comment
        };

        recipe.reviews.push(review);

        // Update average rating
        recipe.rating = recipe.reviews.reduce((acc, item) => item.rating + acc, 0) / recipe.reviews.length;

        await recipe.save();

        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            data: recipe
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error adding review'
        });
    }
});

// @route   GET /api/recipes/ingredient/:ingredients
// @desc    Search recipes by ingredients
// @access  Public
router.get('/ingredient/:ingredients', async (req, res) => {
    try {
        const ingredientList = req.params.ingredients
            .split(',')
            .map(i => i.trim().toLowerCase());

        const recipes = await Recipe.find({
            'ingredients.name': {
                $in: ingredientList.map(i => new RegExp(i, 'i'))
            }
        }).limit(20);

        res.json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error searching recipes by ingredients'
        });
    }
});

module.exports = router;
