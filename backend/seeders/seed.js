const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

dotenv.config();

const recipes = [
    {
        title: 'Hyderabadi Biryani',
        description: 'Dive into the rich and aromatic world of Hyderabadi Biryani—a royal dish layered with fragrant basmati rice, tender meat, and a blend of exotic spices. A true celebration of flavor, culture, and heritage.',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
        category: 'Main Course',
        cuisine: 'Indian',
        prepTime: 30,
        cookTime: 60,
        servings: 6,
        difficulty: 'Hard',
        ingredients: [
            { name: 'Basmati Rice', quantity: '2', unit: 'cups' },
            { name: 'Chicken/Mutton', quantity: '500', unit: 'grams' },
            { name: 'Yogurt', quantity: '1', unit: 'cup' },
            { name: 'Onions', quantity: '3', unit: 'large' },
            { name: 'Tomatoes', quantity: '2', unit: 'medium' },
            { name: 'Biryani Masala', quantity: '2', unit: 'tbsp' },
            { name: 'Saffron', quantity: '1', unit: 'pinch' },
            { name: 'Mint Leaves', quantity: '1/4', unit: 'cup' }
        ],
        instructions: [
            { step: 1, description: 'Soak basmati rice for 30 minutes and drain.' },
            { step: 2, description: 'Marinate meat with yogurt, spices, and salt for 1 hour.' },
            { step: 3, description: 'Fry onions until golden brown and crispy.' },
            { step: 4, description: 'Layer rice and meat mixture in a heavy-bottomed pot.' },
            { step: 5, description: 'Cook on dum (slow heat) for 40-45 minutes.' },
            { step: 6, description: 'Garnish with fried onions, mint, and saffron milk.' }
        ],
        nutritionInfo: {
            calories: 550,
            protein: '25g',
            carbs: '65g',
            fat: '18g'
        },
        tags: ['spicy', 'rice', 'authentic', 'aromatic'],
        rating: 4.8,
        featured: true
    },
    {
        title: 'Paneer Tikka',
        description: 'A popular Indian appetizer made with marinated paneer cubes grilled to perfection. Smoky, spicy, and absolutely delicious!',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800',
        category: 'Appetizer',
        cuisine: 'Indian',
        prepTime: 20,
        cookTime: 15,
        servings: 4,
        difficulty: 'Easy',
        ingredients: [
            { name: 'Paneer', quantity: '400', unit: 'grams' },
            { name: 'Yogurt', quantity: '1/2', unit: 'cup' },
            { name: 'Bell Peppers', quantity: '2', unit: 'medium' },
            { name: 'Tandoori Masala', quantity: '2', unit: 'tbsp' },
            { name: 'Lemon Juice', quantity: '2', unit: 'tbsp' },
            { name: 'Ginger-Garlic Paste', quantity: '1', unit: 'tbsp' }
        ],
        instructions: [
            { step: 1, description: 'Cut paneer and vegetables into cubes.' },
            { step: 2, description: 'Mix yogurt with all spices and marinate for 30 minutes.' },
            { step: 3, description: 'Thread paneer and vegetables on skewers.' },
            { step: 4, description: 'Grill or bake at 200°C for 12-15 minutes.' },
            { step: 5, description: 'Serve hot with mint chutney.' }
        ],
        nutritionInfo: {
            calories: 280,
            protein: '18g',
            carbs: '12g',
            fat: '19g'
        },
        tags: ['vegetarian', 'grilled', 'spicy', 'protein-rich'],
        rating: 4.6,
        featured: true
    },
    {
        title: 'Masala Dosa',
        description: 'A crispy South Indian crepe filled with spiced potato filling. Perfect for breakfast or brunch!',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800',
        category: 'Breakfast',
        cuisine: 'Indian',
        prepTime: 45,
        cookTime: 20,
        servings: 4,
        difficulty: 'Medium',
        ingredients: [
            { name: 'Dosa Batter', quantity: '2', unit: 'cups' },
            { name: 'Potatoes', quantity: '4', unit: 'large' },
            { name: 'Onions', quantity: '2', unit: 'medium' },
            { name: 'Green Chillies', quantity: '3', unit: 'pieces' },
            { name: 'Mustard Seeds', quantity: '1', unit: 'tsp' },
            { name: 'Curry Leaves', quantity: '10', unit: 'pieces' },
            { name: 'Turmeric', quantity: '1/2', unit: 'tsp' }
        ],
        instructions: [
            { step: 1, description: 'Boil and mash potatoes.' },
            { step: 2, description: 'Prepare potato masala filling with spices.' },
            { step: 3, description: 'Heat griddle and spread dosa batter thin.' },
            { step: 4, description: 'Place potato filling in center and fold.' },
            { step: 5, description: 'Serve hot with sambar and chutney.' }
        ],
        nutritionInfo: {
            calories: 320,
            protein: '8g',
            carbs: '52g',
            fat: '8g'
        },
        tags: ['vegetarian', 'crispy', 'healthy', 'south-indian'],
        rating: 4.7,
        featured: true
    },
    {
        title: 'Butter Chicken',
        description: 'Creamy and rich tomato-based curry with tender chicken pieces. A restaurant favorite you can make at home!',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
        category: 'Main Course',
        cuisine: 'Indian',
        prepTime: 25,
        cookTime: 35,
        servings: 4,
        difficulty: 'Medium',
        ingredients: [
            { name: 'Chicken', quantity: '500', unit: 'grams' },
            { name: 'Butter', quantity: '4', unit: 'tbsp' },
            { name: 'Heavy Cream', quantity: '1/2', unit: 'cup' },
            { name: 'Tomato Puree', quantity: '2', unit: 'cups' },
            { name: 'Garam Masala', quantity: '1', unit: 'tbsp' },
            { name: 'Kasuri Methi', quantity: '1', unit: 'tbsp' },
            { name: 'Ginger-Garlic Paste', quantity: '2', unit: 'tbsp' }
        ],
        instructions: [
            { step: 1, description: 'Marinate chicken in yogurt and spices.' },
            { step: 2, description: 'Grill or pan-fry chicken until cooked.' },
            { step: 3, description: 'Prepare tomato-based gravy with butter and spices.' },
            { step: 4, description: 'Add cream and chicken pieces to gravy.' },
            { step: 5, description: 'Simmer for 10 minutes and garnish with cream.' }
        ],
        nutritionInfo: {
            calories: 420,
            protein: '28g',
            carbs: '18g',
            fat: '26g'
        },
        tags: ['creamy', 'popular', 'rich', 'comfort-food'],
        rating: 4.9,
        featured: true
    },
    {
        title: 'Chocolate Brownie',
        description: 'Fudgy, rich chocolate brownies that are crispy on the outside and gooey on the inside. Perfect with vanilla ice cream!',
        image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800',
        category: 'Dessert',
        cuisine: 'American',
        prepTime: 15,
        cookTime: 25,
        servings: 12,
        difficulty: 'Easy',
        ingredients: [
            { name: 'Dark Chocolate', quantity: '200', unit: 'grams' },
            { name: 'Butter', quantity: '150', unit: 'grams' },
            { name: 'Sugar', quantity: '1', unit: 'cup' },
            { name: 'Eggs', quantity: '3', unit: 'large' },
            { name: 'All-Purpose Flour', quantity: '3/4', unit: 'cup' },
            { name: 'Cocoa Powder', quantity: '1/4', unit: 'cup' },
            { name: 'Walnuts', quantity: '1/2', unit: 'cup' }
        ],
        instructions: [
            { step: 1, description: 'Melt chocolate and butter together.' },
            { step: 2, description: 'Mix in sugar and eggs until smooth.' },
            { step: 3, description: 'Fold in flour and cocoa powder.' },
            { step: 4, description: 'Add walnuts and pour into greased pan.' },
            { step: 5, description: 'Bake at 180°C for 25-30 minutes.' }
        ],
        nutritionInfo: {
            calories: 285,
            protein: '4g',
            carbs: '32g',
            fat: '16g'
        },
        tags: ['chocolate', 'sweet', 'dessert', 'baking'],
        rating: 4.8,
        featured: true
    },
    {
        title: 'Chole Bhature',
        description: 'A classic North Indian dish with spicy chickpea curry served with fluffy fried bread. Comfort food at its best!',
        image: 'https://images.unsplash.com/photo-1626132647523-66f2bf23c8a6?w=800',
        category: 'Main Course',
        cuisine: 'Indian',
        prepTime: 30,
        cookTime: 45,
        servings: 4,
        difficulty: 'Medium',
        ingredients: [
            { name: 'Chickpeas', quantity: '2', unit: 'cups' },
            { name: 'All-Purpose Flour', quantity: '2', unit: 'cups' },
            { name: 'Yogurt', quantity: '1/2', unit: 'cup' },
            { name: 'Onions', quantity: '2', unit: 'large' },
            { name: 'Tomatoes', quantity: '3', unit: 'medium' },
            { name: 'Chole Masala', quantity: '2', unit: 'tbsp' },
            { name: 'Tea Bags', quantity: '2', unit: 'pieces' }
        ],
        instructions: [
            { step: 1, description: 'Soak chickpeas overnight and boil with tea bags.' },
            { step: 2, description: 'Prepare spicy chole gravy with onions and tomatoes.' },
            { step: 3, description: 'Make bhature dough with flour, yogurt, and let it rest.' },
            { step: 4, description: 'Roll and deep fry bhature until puffed and golden.' },
            { step: 5, description: 'Serve hot chole with bhature and pickles.' }
        ],
        nutritionInfo: {
            calories: 485,
            protein: '16g',
            carbs: '68g',
            fat: '16g'
        },
        tags: ['spicy', 'filling', 'street-food', 'popular'],
        rating: 4.7,
        featured: true
    },
    {
        title: 'Mango Lassi',
        description: 'A refreshing yogurt-based mango drink, perfect for hot summer days. Sweet, creamy, and absolutely delicious!',
        image: 'https://images.unsplash.com/photo-1589733955941-5eeaf72f72b8?w=800',
        category: 'Beverage',
        cuisine: 'Indian',
        prepTime: 5,
        cookTime: 0,
        servings: 2,
        difficulty: 'Easy',
        ingredients: [
            { name: 'Ripe Mangoes', quantity: '2', unit: 'medium' },
            { name: 'Yogurt', quantity: '1', unit: 'cup' },
            { name: 'Milk', quantity: '1/2', unit: 'cup' },
            { name: 'Sugar', quantity: '2', unit: 'tbsp' },
            { name: 'Cardamom Powder', quantity: '1/4', unit: 'tsp' },
            { name: 'Ice Cubes', quantity: '6', unit: 'pieces' }
        ],
        instructions: [
            { step: 1, description: 'Peel and chop mangoes into pieces.' },
            { step: 2, description: 'Blend mangoes, yogurt, milk, and sugar.' },
            { step: 3, description: 'Add cardamom powder and ice cubes.' },
            { step: 4, description: 'Blend until smooth and frothy.' },
            { step: 5, description: 'Serve chilled with a garnish of mango pieces.' }
        ],
        nutritionInfo: {
            calories: 180,
            protein: '6g',
            carbs: '35g',
            fat: '3g'
        },
        tags: ['refreshing', 'sweet', 'healthy', 'summer'],
        rating: 4.6,
        featured: false
    },
    {
        title: 'Pasta Carbonara',
        description: 'Classic Italian pasta with creamy egg sauce, crispy bacon, and parmesan. Simple yet incredibly satisfying!',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
        category: 'Main Course',
        cuisine: 'Italian',
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        difficulty: 'Medium',
        ingredients: [
            { name: 'Spaghetti', quantity: '400', unit: 'grams' },
            { name: 'Bacon', quantity: '200', unit: 'grams' },
            { name: 'Eggs', quantity: '4', unit: 'large' },
            { name: 'Parmesan Cheese', quantity: '1', unit: 'cup' },
            { name: 'Black Pepper', quantity: '1', unit: 'tsp' },
            { name: 'Garlic', quantity: '3', unit: 'cloves' }
        ],
        instructions: [
            { step: 1, description: 'Cook spaghetti according to package instructions.' },
            { step: 2, description: 'Fry bacon until crispy, add garlic.' },
            { step: 3, description: 'Mix eggs and parmesan in a bowl.' },
            { step: 4, description: 'Toss hot pasta with bacon and egg mixture.' },
            { step: 5, description: 'Season with black pepper and serve immediately.' }
        ],
        nutritionInfo: {
            calories: 520,
            protein: '22g',
            carbs: '58g',
            fat: '22g'
        },
        tags: ['italian', 'creamy', 'quick', 'comfort-food'],
        rating: 4.7,
        featured: false
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');

        // Clear existing data
        await Recipe.deleteMany({});
        await User.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create sample users
        const sampleUsers = await User.create([
            {
                username: 'admin',
                email: 'admin@foodiecrush.com',
                password: 'admin123'
            },
            {
                username: 'john_doe',
                email: 'john@example.com',
                password: 'password123'
            }
        ]);
        console.log('👥 Created sample users');

        // Insert recipes
        const createdRecipes = await Recipe.insertMany(recipes);
        console.log(`📚 Inserted ${createdRecipes.length} recipes`);

        // Add some favorites for the first user
        sampleUsers[1].favorites = [createdRecipes[0]._id, createdRecipes[1]._id];
        await sampleUsers[1].save();
        console.log('❤️  Added favorite recipes for user');

        console.log('\n✨ Database seeded successfully!');
        console.log('\nSample Login Credentials:');
        console.log('Email: admin@foodiecrush.com');
        console.log('Password: admin123');
        console.log('\nOr:');
        console.log('Email: john@example.com');
        console.log('Password: password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
