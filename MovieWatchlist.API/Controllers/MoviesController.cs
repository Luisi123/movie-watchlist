using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;

namespace MovieWatchlist.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private readonly ILogger<MoviesController> _logger;
        private const string TMDB_BASE_URL = "https://api.themoviedb.org/3";
        private const string IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

        public MoviesController(IHttpClientFactory httpClientFactory, IConfiguration configuration, ILogger<MoviesController> logger)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularMovies([FromQuery] int page = 1)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration["TMDB:AccessToken"]);

                var response = await client.GetAsync($"{TMDB_BASE_URL}/movie/popular?page={page}");
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("TMDB API error: {Content}", content);
                    return StatusCode((int)response.StatusCode, new { message = "Failed to fetch popular movies" });
                }

                var data = JsonSerializer.Deserialize<JsonElement>(content);
                var results = data.GetProperty("results").EnumerateArray()
                    .Select(movie => new
                    {
                        id = movie.GetProperty("id").GetInt32(),
                        title = movie.GetProperty("title").GetString(),
                        posterUrl = movie.GetProperty("poster_path").GetString() != null 
                            ? $"{IMAGE_BASE_URL}{movie.GetProperty("poster_path").GetString()}" 
                            : null,
                        year = movie.GetProperty("release_date").GetString()?.Split('-')[0] ?? "N/A",
                        rating = movie.GetProperty("vote_average").GetDouble()
                    })
                    .ToList();

                return Ok(new
                {
                    results,
                    totalResults = data.GetProperty("total_results").GetInt32(),
                    totalPages = data.GetProperty("total_pages").GetInt32()
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching popular movies");
                return StatusCode(500, new { message = "Failed to fetch popular movies" });
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string query, [FromQuery] int page = 1)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration["TMDB:AccessToken"]);

                var response = await client.GetAsync($"{TMDB_BASE_URL}/search/movie?query={Uri.EscapeDataString(query)}&page={page}");
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("TMDB API error: {Content}", content);
                    return StatusCode((int)response.StatusCode, new { message = "Failed to search movies" });
                }

                var data = JsonSerializer.Deserialize<JsonElement>(content);
                var results = data.GetProperty("results").EnumerateArray()
                    .Select(movie => new
                    {
                        id = movie.GetProperty("id").GetInt32(),
                        title = movie.GetProperty("title").GetString(),
                        posterUrl = movie.GetProperty("poster_path").GetString() != null 
                            ? $"{IMAGE_BASE_URL}{movie.GetProperty("poster_path").GetString()}" 
                            : null,
                        year = movie.GetProperty("release_date").GetString()?.Split('-')[0] ?? "N/A",
                        rating = movie.GetProperty("vote_average").GetDouble()
                    })
                    .ToList();

                return Ok(new
                {
                    results,
                    totalResults = data.GetProperty("total_results").GetInt32(),
                    totalPages = data.GetProperty("total_pages").GetInt32()
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching movies");
                return StatusCode(500, new { message = "Failed to search movies" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieDetails(int id)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration["TMDB:AccessToken"]);

                var response = await client.GetAsync($"{TMDB_BASE_URL}/movie/{id}");
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("TMDB API error: {Content}", content);
                    return StatusCode((int)response.StatusCode, new { message = "Failed to fetch movie details" });
                }

                var data = JsonSerializer.Deserialize<JsonElement>(content);
                var movie = new
                {
                    id = data.GetProperty("id").GetInt32(),
                    title = data.GetProperty("title").GetString(),
                    overview = data.GetProperty("overview").GetString(),
                    posterUrl = data.GetProperty("poster_path").GetString() != null 
                        ? $"{IMAGE_BASE_URL}{data.GetProperty("poster_path").GetString()}" 
                        : null,
                    backdropUrl = data.GetProperty("backdrop_path").GetString() != null 
                        ? $"{IMAGE_BASE_URL}{data.GetProperty("backdrop_path").GetString()}" 
                        : null,
                    releaseDate = data.GetProperty("release_date").GetString(),
                    runtime = data.GetProperty("runtime").GetInt32(),
                    rating = data.GetProperty("vote_average").GetDouble(),
                    genres = data.GetProperty("genres").EnumerateArray()
                        .Select(g => g.GetProperty("name").GetString())
                        .ToList()
                };

                return Ok(movie);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching movie details");
                return StatusCode(500, new { message = "Failed to fetch movie details" });
            }
        }

        [HttpGet("{id}/recommendations")]
        public async Task<IActionResult> GetMovieRecommendations(int id)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration["TMDB:AccessToken"]);

                var response = await client.GetAsync($"{TMDB_BASE_URL}/movie/{id}/recommendations");
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("TMDB API error: {Content}", content);
                    return StatusCode((int)response.StatusCode, new { message = "Failed to fetch movie recommendations" });
                }

                var data = JsonSerializer.Deserialize<JsonElement>(content);
                var results = data.GetProperty("results").EnumerateArray()
                    .Select(movie => new
                    {
                        id = movie.GetProperty("id").GetInt32(),
                        title = movie.GetProperty("title").GetString(),
                        posterUrl = movie.GetProperty("poster_path").GetString() != null 
                            ? $"{IMAGE_BASE_URL}{movie.GetProperty("poster_path").GetString()}" 
                            : null,
                        year = movie.GetProperty("release_date").GetString()?.Split('-')[0] ?? "N/A",
                        rating = movie.GetProperty("vote_average").GetDouble()
                    })
                    .ToList();

                return Ok(new
                {
                    results,
                    totalResults = data.GetProperty("total_results").GetInt32(),
                    totalPages = data.GetProperty("total_pages").GetInt32()
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching movie recommendations");
                return StatusCode(500, new { message = "Failed to fetch movie recommendations" });
            }
        }
    }
} 