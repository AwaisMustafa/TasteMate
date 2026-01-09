import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            fetchUserProfile()
        } else {
            setLoading(false)
        }
    }, [token])

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('/api/users/profile')
            setUser(response.data.data)
        } catch (error) {
            console.error('Error fetching profile:', error)
            logout()
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password })
            const { token, user } = response.data

            localStorage.setItem('token', token)
            setToken(token)
            setUser(user)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            toast.success('Login successful!')
            return { success: true }
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed'
            toast.error(message)
            return { success: false, message }
        }
    }

    const register = async (username, email, password) => {
        try {
            const response = await axios.post('/api/auth/register', {
                username,
                email,
                password
            })
            const { token, user } = response.data

            localStorage.setItem('token', token)
            setToken(token)
            setUser(user)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            toast.success('Registration successful!')
            return { success: true }
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed'
            toast.error(message)
            return { success: false, message }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        delete axios.defaults.headers.common['Authorization']
        toast.info('Logged out successfully')
    }

    const value = {
        user,
        token,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!token
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
