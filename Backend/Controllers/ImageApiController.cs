using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixNote.Data;
using PixNote.Models;
using Microsoft.AspNetCore.Authorization;
using System.IO;

namespace PixNote.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageApiController : Controller
    {
        private readonly PhotoDbContext _context;

        public ImageApiController(PhotoDbContext context)
        {
            _context = context;
        }

        // GET: api/ImageApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetImages()
        {
            var images = await _context.Images.Include(i => i.User).ToListAsync();
            return Ok(images); // Returns a list of all images
        }

        // GET: api/ImageApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            var image = await _context.Images
                .Include(i => i.Comments)
                .ThenInclude(c => c.User) // Including comments with users
                .FirstOrDefaultAsync(i => i.ImageId == id);

            if (image == null)
            {
                return NotFound(); // Image not found
            }

            return Ok(image); // Return the image with comments
        }

        // POST: api/ImageApi/uploadImage
        [HttpPost("uploadImage")]
        [Authorize] // Ensure only authenticated users can upload
        public async Task<IActionResult> UploadImage([FromForm] IFormFile imageFile, [FromForm] string title, [FromForm] string description)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var userId = User?.Identity?.Name;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            // Generate a unique file path
            var uploadsFolder = Path.Combine("wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder); // Ensure the uploads folder exists
            }
            var uniqueFileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            try
            {
                // Save the uploaded file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                // Create a new Image record
                var image = new Image
                {
                    Title = title,
                    Description = description,
                    ImagePath = $"/uploads/{uniqueFileName}", // Use relative path for serving files
                    DateUploaded = DateTime.Now,
                    UserId = userId
                };

                _context.Images.Add(image);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Image uploaded successfully", imageId = image.ImageId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/ImageApi/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateImage(int id, [FromBody] Image image)
        {
            if (id != image.ImageId)
            {
                return BadRequest(); // IDs don't match
            }

            _context.Entry(image).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent(); // No content is returned on successful update
        }

        // DELETE: api/ImageApi/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound(); // Image not found
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent(); // Image successfully deleted
        }

        // POST: api/CommentApi
        [HttpPost("comment")]
        [Authorize]
        public async Task<ActionResult<Comment>> CreateComment([FromBody] Comment comment)
        {
            if (comment == null || string.IsNullOrEmpty(comment.CommentText))
            {
                return BadRequest("Invalid comment data.");
            }

            comment.CommentDate = DateTime.Now;
            comment.UserId = User.Identity.Name; // Assuming the logged-in user's ID
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetImage), new { id = comment.ImageId }, comment);
        }

        // DELETE: api/CommentApi/5
        [HttpDelete("comment/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound(); // Comment not found
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent(); // Comment successfully deleted
        }
    }
}
