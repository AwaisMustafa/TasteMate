import { Link } from 'react-router-dom'
import { FaClock, FaUtensils, FaStar, FaHeart } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { userAPI } from '../services/api'
import { toast } from 'react-toastify'
import './RecipeCard.css'

const RecipeCard = ({ recipe, isFavorited = false }) => {
    const { isAuthenticated, user } = useAuth()
    const [isFavorite, setIsFavorite] = useState(isFavorited)

    useEffect(() => {
        setIsFavorite(isFavorited)
    }, [isFavorited])

    const handleFavoriteClick = async (e) => {
        e.preventDefault()

        if (!isAuthenticated) {
            toast.info('Please login to add favorites')
            return
        }

        try {
            if (isFavorite) {
                await userAPI.removeFavorite(recipe._id)
                setIsFavorite(false)
                toast.success('Removed from favorites')
            } else {
                await userAPI.addFavorite(recipe._id)
                setIsFavorite(true)
                toast.success('Added to favorites')
            }
        } catch (error) {
            console.error('Error toggling favorite:', error)
            const message = error.response?.data?.message || 'Failed to update favorites'
            toast.error(message)
        }
    }

    return (
        <Link to={`/recipe/${recipe._id}`} className="recipe-card">
            <div className="recipe-image">
                <img src={recipe.image} alt={recipe.title} />
                <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                >
                    <FaHeart />
                </button>
                <span className="difficulty-badge" data-difficulty={recipe.difficulty}>
                    {recipe.difficulty}
                </span>
            </div>
            <div className="recipe-content">
                <h3>{recipe.title}</h3>
                <p>{recipe.description.substring(0, 100)}...</p>

                <div className="recipe-meta">
                    <div className="meta-item">
                        <FaClock />
                        <span>{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="meta-item">
                        <FaUtensils />
                        <span>{recipe.servings} servings</span>
                    </div>
                    <div className="meta-item">
                        <FaStar />
                        <span>{recipe.rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="recipe-tags">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard
