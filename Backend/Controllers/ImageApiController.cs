/*using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixNote.Models;
using PixNote.ViewModels;

[Route("api/[controller]")]
[ApiController]
public class ImageApiController : Controller
{
    private readonly PhotoDbContext _context;

    public ImageApiController(PhotoDbContext context)
    {
        _context = context;
    }

    // Get all images
    [HttpGet]
    [Authorize]  // Ensure the user is authenticated before fetching images
    public async Task<ActionResult<IEnumerable<ImageDTO>>> GetImages()
    {
        var images = await _context.Images
            .Include(i => i.User)
            .ToListAsync();

        var imageDtos = images.Select(i => new ImageDTO
        {
            ImageId = i.ImageId,
            Title = i.Title,
            Description = i.Description,
            ImagePath = i.ImagePath,
            DateUploaded = i.DateUploaded,
            UserId = i.UserId
        }).ToList();

        return Ok(imageDtos); 
    }

    // Get single image by ID
    [HttpGet("{id}")]
    [Authorize]  // Ensure the user is authenticated before fetching image details
    public async Task<ActionResult<ImageDTO>> GetImage(int id)
    {
        var image = await _context.Images
            .Include(i => i.Comments)
            .ThenInclude(c => c.User) 
            .FirstOrDefaultAsync(i => i.ImageId == id);

        if (image == null)
        {
            return NotFound(); 
        }

        var imageDto = new ImageDTO
        {
            ImageId = image.ImageId,
            Title = image.Title,
            Description = image.Description,
            ImagePath = image.ImagePath,
            DateUploaded = image.DateUploaded,
            UserId = image.UserId
        };

        return Ok(imageDto); 
    }

    // POST: Upload an image
    [HttpPost("uploadImage")]
    [Authorize]  // Ensure the user is authenticated to upload images
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

        var uploadsFolder = Path.Combine("wwwroot", "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder); 
        }
        var uniqueFileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        try
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            var image = new Image
            {
                Title = title,
                Description = description,
                ImagePath = $"/uploads/{uniqueFileName}", 
                DateUploaded = DateTime.Now,
                UserId = userId
            };

            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            var imageDto = new ImageDTO
            {
                ImageId = image.ImageId,
                Title = image.Title,
                Description = image.Description,
                ImagePath = image.ImagePath,
                DateUploaded = image.DateUploaded,
                UserId = image.UserId
            };

            return Ok(new { message = "Image uploaded successfully", image = imageDto });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // PUT: Update an image
    [HttpPut("{id}")]
    [Authorize]  // Ensure the user is authenticated to update images
    public async Task<IActionResult> UpdateImage(int id, [FromBody] Image image)
    {
        if (id != image.ImageId)
        {
            return BadRequest(); 
        }

        _context.Entry(image).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent(); 
    }

    // DELETE: Delete an image
    [HttpDelete("{id}")]
    [Authorize]  // Ensure the user is authenticated to delete images
    public async Task<IActionResult> DeleteImage(int id)
    {
        var image = await _context.Images.FindAsync(id);

        if (image == null)
        {
            return NotFound(); 
        }

        _context.Images.Remove(image);
        await _context.SaveChangesAsync();

        return NoContent(); 
    }

    // POST: Add a comment to an image
    [HttpPost("comment")]
    [Authorize]  // Ensure the user is authenticated to add a comment
    public async Task<ActionResult<CommentDTO>> CreateComment([FromBody] Comment comment)
    {
        if (comment == null || string.IsNullOrEmpty(comment.CommentText))
        {
            return BadRequest("Invalid comment data.");
        }

        comment.CommentDate = DateTime.Now;
        comment.UserId = User.Identity.Name; 
        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        var commentDto = new CommentDTO
        {
            CommentId = comment.CommentId,
            CommentText = comment.CommentText,
            CommentDate = comment.CommentDate,
            ImageId = comment.ImageId,
            UserId = comment.UserId
        };

        return CreatedAtAction(nameof(GetImage), new { id = comment.ImageId }, commentDto);
    }

    // DELETE: Delete a comment
    [HttpDelete("comment/{id}")]
    [Authorize]  // Ensure the user is authenticated to delete comments
    public async Task<IActionResult> DeleteComment(int id)
    {
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
        {
            return NotFound(); 
        }

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

*/