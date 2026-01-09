import { useEffect, useState } from 'react'
import { recipeAPI } from '../services/api'
import RecipeCard from '../components/RecipeCard'
import { FaSearch } from 'react-icons/fa'
import './Recipes.css'

const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        category: '',
        cuisine: '',
        difficulty: '',
        search: ''
    })

    useEffect(() => {
        fetchRecipes()
    }, [filters])

    const fetchRecipes = async () => {
        try {
            setLoading(true)
            const response = await recipeAPI.getAll(filters)
            setRecipes(response.data.data)
        } catch (error) {
            console.error('Error fetching recipes:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="recipes-page">
            <div className="container">
                <div className="page-header">
                    <h1>Discover Amazing Recipes</h1>
                    <p>Browse our collection of delicious recipes from around the world</p>
                </div>

                <div className="filters-section">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>

                    <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Beverage">Beverage</option>
                        <option value="Snack">Snack</option>
                    </select>

                    <select
                        value={filters.cuisine}
                        onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                    >
                        <option value="">All Cuisines</option>
                        <option value="Indian">Indian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Italian">Italian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Thai">Thai</option>
                        <option value="American">American</option>
                    </select>

                    <select
                        value={filters.difficulty}
                        onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    >
                        <option value="">All Levels</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : recipes.length > 0 ? (
                    <div className="recipe-grid">
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>No recipes found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Recipes
