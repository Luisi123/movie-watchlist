const API_BASE_URL = 'http://localhost:5002/api';

export async function register(name, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Registration failed');
    }
}

export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw new Error('Login failed');
    }
}

export function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

export function getToken() {
    return localStorage.getItem('token');
}

export function isAuthenticated() {
    return !!getToken();
}

export function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export async function verifyToken() {
    const token = getToken();

    if (!token) {
        return { valid: false };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            // Token is invalid or expired, clear local storage
            logout();
            // Depending on your API response, you might want to use data.message here
            throw new Error(data.message || 'Token verification failed');
        }

        // Assuming your verify endpoint returns user data upon successful verification
        return { valid: true, user: data.user };
    } catch (error) {
        // Handle network errors or other issues during verification
        return { valid: false };
    }
}

export async function getCurrentUser() {
    const token = getToken();
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get current user');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Failed to get current user');
    }
}