import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'
import IngredientSearch from './pages/IngredientSearch'
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <div className="app">
            <Navbar />
            <main style={{ minHeight: 'calc(100vh - 400px)' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/recipe/:id" element={<RecipeDetail />} />
                    <Route path="/ingredient-search" element={<IngredientSearch />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                            <PrivateRoute>
                                <Favorites />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
