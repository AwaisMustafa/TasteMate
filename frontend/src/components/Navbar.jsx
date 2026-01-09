import { Link, useNavigate } from 'react-router-dom'
import { FaBell, FaUser, FaHeart, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="logo">
                        <h1>
                            <span className="logo-first">Taste</span>
                            <span className="logo-second">Mate</span>
                        </h1>
                    </Link>

                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/recipes">Recipes</Link></li>
                        <li><Link to="/ingredient-search">Ingredient Search</Link></li>
                        {isAuthenticated && (
                            <li><Link to="/favorites">Favorites</Link></li>
                        )}
                    </ul>

                    <div className="nav-actions">
                        {isAuthenticated ? (
                            <>
                                <button className="icon-btn" title="Notifications">
                                    <FaBell />
                                </button>
                                <Link to="/favorites" className="icon-btn" title="Favorites">
                                    <FaHeart />
                                </Link>
                                <Link to="/profile" className="icon-btn" title="Profile">
                                    <FaUser />
                                </Link>
                                <button onClick={handleLogout} className="icon-btn" title="Logout">
                                    <FaSignOutAlt />
                                </button>
                                <div className="user-avatar">
                                    <img src={user?.avatar} alt={user?.username} />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-login">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
