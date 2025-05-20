using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieWatchlist.API.Data;
using MovieWatchlist.API.Models;

namespace MovieWatchlist.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WatchlistController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WatchlistController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetWatchlist(int userId)
        {
            var watchlist = await _context.WatchlistItems
                .Where(w => w.UserId == userId)
                .OrderByDescending(w => w.AddedAt)
                .ToListAsync();

            return Ok(watchlist);
        }

        [HttpPost]
        public async Task<IActionResult> AddToWatchlist([FromBody] AddToWatchlistRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest(new { message = "Invalid request data" });
                }

                if (request.UserId <= 0)
                {
                    return BadRequest(new { message = "Invalid user ID" });
                }

                if (request.MovieId <= 0)
                {
                    return BadRequest(new { message = "Invalid movie ID" });
                }

                if (string.IsNullOrWhiteSpace(request.MovieTitle))
                {
                    return BadRequest(new { message = "Movie title is required" });
                }

                // Verify that the user exists
                var user = await _context.Users.FindAsync(request.UserId);
                if (user == null)
                {
                    return BadRequest(new { message = "User not found" });
                }

                // Check if the movie is already in the user's watchlist
                var existingItem = await _context.WatchlistItems
                    .FirstOrDefaultAsync(w => w.UserId == request.UserId && w.MovieId == request.MovieId);

                if (existingItem != null)
                {
                    return BadRequest(new { message = "Movie is already in your watchlist" });
                }

                try
                {
                    var watchlistItem = new WatchlistItem
                    {
                        UserId = request.UserId,
                        MovieId = request.MovieId,
                        MovieTitle = request.MovieTitle,
                        PosterUrl = request.PosterUrl,
                        AddedAt = DateTime.UtcNow
                    };

                    _context.WatchlistItems.Add(watchlistItem);
                    
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateException dbEx)
                    {
                        // Log the database exception
                        Console.WriteLine($"Database error during SaveChanges: {dbEx.Message}");
                        if (dbEx.InnerException != null)
                        {
                            Console.WriteLine($"Inner exception: {dbEx.InnerException.Message}");
                        }
                        return StatusCode(500, new { 
                            message = "Database error occurred while saving the watchlist item",
                            error = "Failed to add movie to watchlist. Please try again later."
                        });
                    }

                    return Ok(new { 
                        message = "Movie added to watchlist successfully",
                        item = watchlistItem 
                    });
                }
                catch (Exception ex)
                {
                    // Log the exception
                    Console.WriteLine($"Error creating watchlist item: {ex.Message}");
                    if (ex.InnerException != null)
                    {
                        Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                    }
                    return StatusCode(500, new { 
                        message = "Error creating watchlist item",
                        error = "Failed to add movie to watchlist. Please try again later."
                    });
                }
            }
            catch (Exception ex)
            {
                // Log the general exception
                Console.WriteLine($"General error in AddToWatchlist: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new { 
                    message = "An error occurred while adding the movie to your watchlist",
                    error = "Please try again later."
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWatchlistItem(int id, [FromBody] UpdateWatchlistItemRequest request)
        {
            var item = await _context.WatchlistItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.Watched = request.Watched;
            item.Rating = request.Rating;
            item.Review = request.Review;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromWatchlist(int id)
        {
            var item = await _context.WatchlistItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.WatchlistItems.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Item removed from watchlist" });
        }
    }

    public class AddToWatchlistRequest
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public string MovieTitle { get; set; }
        public string? PosterUrl { get; set; }
    }

    public class UpdateWatchlistItemRequest
    {
        public bool Watched { get; set; }
        public int? Rating { get; set; }
        public string? Review { get; set; }
    }
} 