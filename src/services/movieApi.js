const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_API_KEY = 'f5c37777eebba305f9446d4a7d791979'; // Direct API key

// Common headers for all requests
const headers = {
    'accept': 'application/json'
};

// Assuming your backend is running on port 5002
export const API_BASE_URL = 'http://localhost:5002/api/Movies';

/**
 * Get popular movies
 */
export async function getPopularMovies(page = 1) {
    const url = `${API_BASE_URL}/popular?page=${page}`;
    console.log('Fetching popular movies from:', url);

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Response not OK:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getPopularMovies:', error);
        throw new Error(`Failed to fetch popular movies: ${error.message}`);
    }
}

/**
 * Search movies by title
 */
export async function searchMoviesByTitle(query, page = 1) {
    const url = `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}`;
    console.log('Searching movies with URL:', url);

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Search response not OK:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in searchMoviesByTitle:', error);
        throw new Error(`Failed to search movies: ${error.message}`);
    }
}

/**
 * Get movie details
 * @param {number} movieId - The ID of the movie
 * @returns {Promise} - Promise containing movie details
 */
export async function getMovieDetails(movieId) {
    const url = `${API_BASE_URL}/${movieId}`;
    console.log('Fetching movie details from:', url);

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Movie details response not OK:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getMovieDetails:', error);
        throw new Error(`Failed to fetch movie details: ${error.message}`);
    }
}

/**
 * Get movie recommendations
 */
export async function getMovieRecommendations(movieId) {
    const url = `${API_BASE_URL}/${movieId}/recommendations`;
    console.log('Fetching movie recommendations from:', url);

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Recommendations response not OK:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getMovieRecommendations:', error);
        throw new Error(`Failed to fetch movie recommendations: ${error.message}`);
    }
}

export async function register(name, email, password) {
  // Implementation of register function
}
