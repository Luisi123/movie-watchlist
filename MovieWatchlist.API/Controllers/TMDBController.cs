using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace MovieWatchlist.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TMDBController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _baseUrl = "https://api.themoviedb.org/3";
        private readonly string _imageBaseUrl = "https://image.tmdb.org/t/p/w500";

        public TMDBController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient();
            _apiKey = configuration["TMDB:ApiKey"];
        }

        [HttpGet("movies/popular")]
        public async Task<IActionResult> GetPopularMovies([FromQuery] int page = 1)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_baseUrl}/movie/popular?api_key={_apiKey}&page={page}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(content);

                var results = data.GetProperty("results");
                var movies = new List<object>();

                foreach (var movie in results.EnumerateArray())
                {
                    movies.Add(new
                    {
                        id = movie.GetProperty("id").GetInt32(),
                        title = movie.GetProperty("title").GetString(),
                        posterUrl = movie.GetProperty("poster_path").GetString() != null
                            ? $"{_imageBaseUrl}{movie.GetProperty("poster_path").GetString()}"
                            : null,
                        year = movie.GetProperty("release_date").GetString()?.Split('-')[0] ?? "N/A",
                        rating = movie.GetProperty("vote_average").GetDouble()
                    });
                }

                return Ok(new
                {
                    results = movies,
                    totalResults = data.GetProperty("total_results").GetInt32(),
                    totalPages = data.GetProperty("total_pages").GetInt32()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to fetch popular movies", error = ex.Message });
            }
        }

        [HttpGet("movies/search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string query, [FromQuery] int page = 1)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_baseUrl}/search/movie?api_key={_apiKey}&query={Uri.EscapeDataString(query)}&page={page}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(content);

                var results = data.GetProperty("results");
                var movies = new List<object>();

                foreach (var movie in results.EnumerateArray())
                {
                    movies.Add(new
                    {
                        id = movie.GetProperty("id").GetInt32(),
                        title = movie.GetProperty("title").GetString(),
                        posterUrl = movie.GetProperty("poster_path").GetString() != null
                            ? $"{_imageBaseUrl}{movie.GetProperty("poster_path").GetString()}"
                            : null,
                        year = movie.GetProperty("release_date").GetString()?.Split('-')[0] ?? "N/A",
                        rating = movie.GetProperty("vote_average").GetDouble()
                    });
                }

                return Ok(new
                {
                    results = movies,
                    totalResults = data.GetProperty("total_results").GetInt32(),
                    totalPages = data.GetProperty("total_pages").GetInt32()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to search movies", error = ex.Message });
            }
        }

        [HttpGet("movies/{id}")]
        public async Task<IActionResult> GetMovieDetails(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_baseUrl}/movie/{id}?api_key={_apiKey}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(content);

                var genres = new List<string>();
                foreach (var genre in data.GetProperty("genres").EnumerateArray())
                {
                    genres.Add(genre.GetProperty("name").GetString());
                }

                return Ok(new
                {
                    id = data.GetProperty("id").GetInt32(),
                    title = data.GetProperty("title").GetString(),
                    overview = data.GetProperty("overview").GetString(),
                    posterUrl = data.GetProperty("poster_path").GetString() != null
                        ? $"{_imageBaseUrl}{data.GetProperty("poster_path").GetString()}"
                        : null,
                    backdropUrl = data.GetProperty("backdrop_path").GetString() != null
                        ? $"{_imageBaseUrl}{data.GetProperty("backdrop_path").GetString()}"
                        : null,
                    releaseDate = data.GetProperty("release_date").GetString(),
                    runtime = data.GetProperty("runtime").GetInt32(),
                    rating = data.GetProperty("vote_average").GetDouble(),
                    genres = genres
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to fetch movie details", error = ex.Message });
            }
        }

        [HttpGet("movies/{id}/recommendations")]
        public async Task<IActionResult> GetMovieRecommendations(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_baseUrl}/movie/{id}/recommendations?api_key={_apiKey}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(content);

                var results = data.GetProperty("results");
                var movies = new List<object>();

                foreach (var movie in results.EnumerateArray())
                {
                    movies.Add(new
                    {
                        id = movie.GetProperty("id").GetInt32(),
                        title = movie.GetProperty("title").GetString(),
                        posterUrl = movie.GetProperty("poster_path").GetString() != null
                            ? $"{_imageBaseUrl}{movie.GetProperty("poster_path").GetString()}"
                            : null,
                        year = movie.GetProperty("release_date").GetString()?.Split('-')[0] ?? "N/A",
                        rating = movie.GetProperty("vote_average").GetDouble()
                    });
                }

                return Ok(new
                {
                    results = movies,
                    totalResults = data.GetProperty("total_results").GetInt32(),
                    totalPages = data.GetProperty("total_pages").GetInt32()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to fetch movie recommendations", error = ex.Message });
            }
        }
    }
} 