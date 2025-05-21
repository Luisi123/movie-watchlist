// Assuming your backend is running on port 5002
const API_BASE_URL = 'http://localhost:5002/api/TMDB';

/**
 * Get popular movies
 */
async function getPopularMovies(page = 1) {
    const url = `${API_BASE_URL}/movies/popular?page=${page}`;
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
async function searchMoviesByTitle(query, page = 1) {
    const url = `${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}&page=${page}`;
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

export { getPopularMovies as g, searchMoviesByTitle as s };
