const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=1b2fd19d'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * Search for movies using a query string
 * @param {string} query - The search query
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise containing search results
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json();
    
    // Transform the results to match our application's needs
    return {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
        rating: movie.vote_average,
        overview: movie.overview
      }))
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get popular movies
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise containing popular movies
 */
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    
    const data = await response.json();
    
    // Transform the results to match our application's needs
    return {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
        rating: movie.vote_average,
        overview: movie.overview
      }))
    };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

/**
 * Get movie details
 * @param {number} movieId - The ID of the movie
 * @returns {Promise} - Promise containing movie details
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    
    const movie = await response.json();
    
    // Transform to match our application's needs
    return {
      id: movie.id,
      title: movie.title,
      posterUrl: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
      backdropUrl: movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : null,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      overview: movie.overview,
      runtime: movie.runtime,
      genres: movie.genres.map(genre => genre.name),
      cast: movie.credits?.cast?.slice(0, 10).map(person => ({
        id: person.id,
        name: person.name,
        character: person.character,
        profilePath: person.profile_path ? `${IMAGE_BASE_URL}${person.profile_path}` : null
      })) || [],
      director: movie.credits?.crew?.find(person => person.job === 'Director')?.name || 'Unknown',
      trailer: movie.videos?.results?.find(video => 
        video.type === 'Trailer' && video.site === 'YouTube'
      )?.key || null
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Get movie recommendations based on a movie ID
 * @param {number} movieId - The ID of the movie
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise containing recommended movies
 */
export const getMovieRecommendations = async (movieId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie recommendations');
    }
    
    const data = await response.json();
    
    // Transform the results to match our application's needs
    return {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
        rating: movie.vote_average,
        overview: movie.overview
      }))
    };
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    throw error;
  }
};