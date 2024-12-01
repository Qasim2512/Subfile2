using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixNote.Models;  // Adjust based on your namespace
using PixNote.Services; // If needed

[Route("api/[controller]")]
[ApiController]
public class ImagesController : ControllerBase
{
    private readonly PhotoDbContext _context;

    public ImagesController(PhotoDbContext context)
    {
        _context = context;
    }

    // GET: api/images
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Image>>> GetImages()
    {
        // Retrieve all images from the database
        var images = await _context.Images.ToListAsync();

        // Return the list of images
        return Ok(images);
    }
}
