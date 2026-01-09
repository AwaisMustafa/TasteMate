import axios from 'axios'

const API_URL = '/api'

// Recipe APIs
export const recipeAPI = {
    getAll: (params) => axios.get(`${API_URL}/recipes`, { params }),
    getById: (id) => axios.get(`${API_URL}/recipes/${id}`),
    getFeatured: () => axios.get(`${API_URL}/recipes/featured/list`),
    searchByIngredients: (ingredients) =>
        axios.get(`${API_URL}/recipes/ingredient/${ingredients}`),
    addReview: (id, data) => axios.post(`${API_URL}/recipes/${id}/review`, data)
}

// User APIs
export const userAPI = {
    getProfile: () => axios.get(`${API_URL}/users/profile`),
    updateProfile: (data) => axios.put(`${API_URL}/users/profile`, data),
    addFavorite: (recipeId) => axios.post(`${API_URL}/users/favorites/${recipeId}`),
    removeFavorite: (recipeId) => axios.delete(`${API_URL}/users/favorites/${recipeId}`),
    getFavorites: () => axios.get(`${API_URL}/users/favorites`)
}

// Auth APIs
export const authAPI = {
    login: (data) => axios.post(`${API_URL}/auth/login`, data),
    register: (data) => axios.post(`${API_URL}/auth/register`, data)
}

export default {
    recipe: recipeAPI,
    user: userAPI,
    auth: authAPI
}
