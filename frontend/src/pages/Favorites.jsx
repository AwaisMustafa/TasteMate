import { useEffect, useState } from 'react'
import { userAPI } from '../services/api'
import RecipeCard from '../components/RecipeCard'
import './Favorites.css'

const Favorites = () => {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFavorites()
    }, [])

    const fetchFavorites = async () => {
        try {
            const response = await userAPI.getFavorites()
            setFavorites(response.data.data)
        } catch (error) {
            console.error('Error fetching favorites:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="favorites-page">
            <div className="container">
                <div className="page-header">
                    <h1>My Favorite Recipes</h1>
                    <p>Your collection of beloved recipes</p>
                </div>

                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : favorites.length > 0 ? (
                    <div className="recipe-grid">
                        {favorites.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <div className="no-favorites">
                        <p>You haven't added any favorites yet!</p>
                        <p>Start exploring recipes and add your favorites.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorites
