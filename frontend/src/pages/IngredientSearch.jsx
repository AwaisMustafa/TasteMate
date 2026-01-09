import { useState } from 'react'
import { recipeAPI } from '../services/api'
import RecipeCard from '../components/RecipeCard'
import { FaSearch } from 'react-icons/fa'
import './IngredientSearch.css'

const IngredientSearch = () => {
    const [ingredients, setIngredients] = useState('')
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!ingredients.trim()) return

        setLoading(true)
        setSearched(true)
        try {
            const response = await recipeAPI.searchByIngredients(ingredients)
            setRecipes(response.data.data)
        } catch (error) {
            console.error('Error searching recipes:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="ingredient-search-page">
            <div className="container">
                <div className="search-header">
                    <h1>Find Recipes by Ingredients</h1>
                    <p>Enter the ingredients you have, separated by commas</p>
                </div>

                <form onSubmit={handleSearch} className="ingredient-search-form">
                    <div className="search-input-wrapper">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="e.g., chicken, tomato, rice"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Search Recipes
                    </button>
                </form>

                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : searched && recipes.length > 0 ? (
                    <div className="results-section">
                        <h2>Found {recipes.length} Recipes</h2>
                        <div className="recipe-grid">
                            {recipes.map((recipe) => (
                                <RecipeCard key={recipe._id} recipe={recipe} />
                            ))}
                        </div>
                    </div>
                ) : searched && recipes.length === 0 ? (
                    <div className="no-results">
                        <p>No recipes found with those ingredients.</p>
                        <p>Try different ingredients or check your spelling.</p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default IngredientSearch
