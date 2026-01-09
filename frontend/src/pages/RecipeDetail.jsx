import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { recipeAPI, userAPI } from '../services/api'
import { FaClock, FaUtensils, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import './RecipeDetail.css'

const RecipeDetail = () => {
    const { id } = useParams()
    const { isAuthenticated, user } = useAuth()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
    const [submittingReview, setSubmittingReview] = useState(false)

    useEffect(() => {
        fetchRecipeDetail()
        checkIfFavorite()
    }, [id])

    const fetchRecipeDetail = async () => {
        try {
            const response = await recipeAPI.getById(id)
            setRecipe(response.data.data)
        } catch (error) {
            console.error('Error fetching recipe:', error)
        } finally {
            setLoading(false)
        }
    }

    const checkIfFavorite = async () => {
        if (!isAuthenticated) return
        try {
            const response = await userAPI.getFavorites()
            const favorites = response.data.data
            setIsFavorite(favorites.some(fav => fav._id === id))
        } catch (error) {
            console.error('Error checking favorites:', error)
        }
    }

    const toggleFavorite = async () => {
        if (!isAuthenticated) {
            toast.info('Please login to add favorites')
            return
        }

        try {
            if (isFavorite) {
                await userAPI.removeFavorite(id)
                setIsFavorite(false)
                toast.success('Removed from favorites')
            } else {
                await userAPI.addFavorite(id)
                setIsFavorite(true)
                toast.success('Added to favorites')
            }
        } catch (error) {
            console.error('Error toggling favorite:', error)
            toast.error(error.response?.data?.message || 'Failed to update favorites')
        }
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault()

        if (!isAuthenticated) {
            toast.info('Please login to add a review')
            return
        }

        setSubmittingReview(true)
        try {
            const response = await recipeAPI.addReview(id, reviewForm)
            setRecipe(response.data.data)
            setReviewForm({ rating: 5, comment: '' })
            toast.success('Review added successfully!')
        } catch (error) {
            console.error('Error adding review:', error)
            toast.error(error.response?.data?.message || 'Failed to add review')
        } finally {
            setSubmittingReview(false)
        }
    }

    if (loading) {
        return (
            <div className="loader-container" style={{ minHeight: '60vh' }}>
                <div className="loader"></div>
            </div>
        )
    }

    if (!recipe) {
        return <div className="container"><p>Recipe not found</p></div>
    }

    return (
        <div className="recipe-detail">
            <div className="recipe-hero" style={{ backgroundImage: `url(${recipe.image})` }}>
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-header">
                            <div>
                                <h1>{recipe.title}</h1>
                                <p>{recipe.description}</p>
                            </div>
                            <button
                                className={`favorite-btn-large ${isFavorite ? 'active' : ''}`}
                                onClick={toggleFavorite}
                                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                <span>{isFavorite ? 'Saved' : 'Save'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="recipe-info-bar">
                    <div className="info-item">
                        <FaClock />
                        <div>
                            <strong>Total Time</strong>
                            <span>{recipe.prepTime + recipe.cookTime} minutes</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <FaUtensils />
                        <div>
                            <strong>Servings</strong>
                            <span>{recipe.servings} people</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <FaStar />
                        <div>
                            <strong>Rating</strong>
                            <span>{recipe.rating.toFixed(1)} / 5.0</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <strong>Difficulty</strong>
                        <span className={`difficulty-${recipe.difficulty.toLowerCase()}`}>
                            {recipe.difficulty}
                        </span>
                    </div>
                </div>

                <div className="recipe-content-grid">
                    <div className="ingredients-section">
                        <h2>Ingredients</h2>
                        <ul className="ingredients-list">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    <span>{ingredient.quantity} {ingredient.unit}</span> {ingredient.name}
                                </li>
                            ))}
                        </ul>

                        {recipe.nutritionInfo && (
                            <div className="nutrition-info">
                                <h3>Nutrition Info</h3>
                                <div className="nutrition-grid">
                                    <div><strong>Calories:</strong> {recipe.nutritionInfo.calories}</div>
                                    <div><strong>Protein:</strong> {recipe.nutritionInfo.protein}</div>
                                    <div><strong>Carbs:</strong> {recipe.nutritionInfo.carbs}</div>
                                    <div><strong>Fat:</strong> {recipe.nutritionInfo.fat}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="instructions-section">
                        <h2>Instructions</h2>
                        <ol className="instructions-list">
                            {recipe.instructions.map((instruction) => (
                                <li key={instruction.step}>
                                    <div className="step-number">Step {instruction.step}</div>
                                    <p>{instruction.description}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="reviews-section">
                    <h2>Reviews ({recipe.reviews?.length || 0})</h2>

                    {/* Existing Reviews */}
                    {recipe.reviews && recipe.reviews.length > 0 && (
                        <div className="reviews-list">
                            {recipe.reviews.map((review, index) => (
                                <div key={index} className="review-card">
                                    <div className="review-header">
                                        <div className="review-user">
                                            <img
                                                src={review.user?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=User'}
                                                alt={review.user?.username || 'User'}
                                            />
                                            <div>
                                                <strong>{review.user?.username || 'Anonymous'}</strong>
                                                <span className="review-date">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="review-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={i < review.rating ? 'filled' : ''}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add Review Form */}
                    {isAuthenticated ? (
                        <div className="add-review-form">
                            <h3>Write a Review</h3>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="rating-input">
                                    <label>Your Rating:</label>
                                    <div className="star-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={star <= reviewForm.rating ? 'filled clickable' : 'clickable'}
                                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Your Review:</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Share your experience with this recipe..."
                                        value={reviewForm.comment}
                                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={submittingReview}
                                >
                                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="login-prompt">
                            <p>Please <a href="/login">login</a> to write a review</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RecipeDetail
