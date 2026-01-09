import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaUtensils, FaBook } from 'react-icons/fa'
import { recipeAPI } from '../services/api'
import RecipeCard from '../components/RecipeCard'
import './Home.css'

const Home = () => {
    const [featuredRecipes, setFeaturedRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFeaturedRecipes()
    }, [])

    const fetchFeaturedRecipes = async () => {
        try {
            const response = await recipeAPI.getFeatured()
            setFeaturedRecipes(response.data.data)
        } catch (error) {
            console.error('Error fetching featured recipes:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background animated-gradient"></div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="fade-in-up">
                                Turn Your Ingredients Into <span className="gradient-text">Delicious Meals</span>
                            </h1>
                            <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                                Discover amazing recipes, explore new cuisines, and make cooking fun again.
                                From quick weeknight dinners to impressive weekend feasts.
                            </p>
                            <div className="hero-buttons fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <Link to="/ingredient-search" className="btn btn-primary">
                                    <FaSearch /> Find Recipes
                                </Link>
                                <Link to="/recipes" className="btn btn-secondary">
                                    <FaBook /> Browse All
                                </Link>
                            </div>
                        </div>
                        <div className="hero-image fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <img
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600"
                                alt="Delicious Food"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Recipes */}
            <section className="section featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Recipes</h2>
                        <p>Handpicked favorites loved by food enthusiasts</p>
                    </div>

                    {loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <div className="recipe-grid">
                            {featuredRecipes.map((recipe) => (
                                <RecipeCard key={recipe._id} recipe={recipe} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <div className="container">
                    <h2>How It Works</h2>
                    <div className="steps">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <FaSearch className="step-icon" />
                            <h3>Add Your Ingredients</h3>
                            <p>Enter ingredients you have in your kitchen</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <FaUtensils className="step-icon" />
                            <h3>Discover Recipes</h3>
                            <p>Browse recipes that match your available ingredients</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <FaBook className="step-icon" />
                            <h3>Start Cooking</h3>
                            <p>Follow step-by-step instructions to prepare your meal</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Start Your Culinary Journey?</h2>
                        <p>Join thousands of food lovers discovering new recipes every day</p>
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
