import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaHeart } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h2 className="footer-logo">
                            <span className="logo-first">Taste</span>
                            <span className="logo-second">Mate</span>
                        </h2>
                        <p>Delicious recipes at your fingertips.</p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/recipes">Recipes</Link></li>
                            <li><Link to="/ingredient-search">Ingredient Search</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a
                                href="https://www.facebook.com/share/1CDuc9eqYJ/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://www.instagram.com/hey_sxchin?igsh=MWdiNndnN3U5d3d4YQ=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://x.com/hey_sxchin"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter)"
                            >
                                <FaXTwitter />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © 2026 TasteMate. All rights reserved. Made with <FaHeart className="heart-icon" /> by TasteMate Team
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
