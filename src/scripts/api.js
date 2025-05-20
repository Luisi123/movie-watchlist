// Utility function to make authenticated API requests
export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 401) {
            // Token is invalid or expired
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = '/signup';
            throw new Error('Authentication required');
        }

        return response;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
} 