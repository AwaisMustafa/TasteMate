import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { userAPI } from '../services/api'
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import './Profile.css'

const Profile = () => {
    const { user } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || ''
    })
    const [loading, setLoading] = useState(false)

    if (!user) {
        return <div className="loader-container"><div className="loader"></div></div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await userAPI.updateProfile(formData)
            toast.success('Profile updated successfully!')
            setIsEditing(false)
            window.location.reload()
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error(error.response?.data?.message || 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            username: user.username,
            email: user.email
        })
        setIsEditing(false)
    }

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-card">
                    <div className="profile-header">
                        <img src={user.avatar} alt={user.username} className="profile-avatar" />
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                    </div>

                    <div className="profile-info">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="edit-form">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="button-group">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                        <FaTimes /> Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="info-row">
                                    <FaUser />
                                    <div>
                                        <strong>Username</strong>
                                        <span>{user.username}</span>
                                    </div>
                                </div>
                                <div className="info-row">
                                    <FaEnvelope />
                                    <div>
                                        <strong>Email</strong>
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                                <button className="btn btn-primary edit-btn" onClick={() => setIsEditing(true)}>
                                    <FaEdit /> Edit Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
