using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
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

    // GET: api/ImageApi
    [HttpGet]
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

        return Ok(imageDtos); // Returns a list of images as DTOs
    }

    // GET: api/ImageApi/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ImageDTO>> GetImage(int id)
    {
        var image = await _context.Images
            .Include(i => i.Comments)
            .ThenInclude(c => c.User) // Including comments with users
            .FirstOrDefaultAsync(i => i.ImageId == id);

        if (image == null)
        {
            return NotFound(); // Image not found
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

        return Ok(imageDto); // Return the image as DTO
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

            // Return ImageDTO after image upload
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
    public async Task<ActionResult<CommentDTO>> CreateComment([FromBody] Comment comment)
    {
        if (comment == null || string.IsNullOrEmpty(comment.CommentText))
        {
            return BadRequest("Invalid comment data.");
        }

        comment.CommentDate = DateTime.Now;
        comment.UserId = User.Identity.Name; // Assuming the logged-in user's ID
        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        // Return CommentDTO after creating a comment
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
public class ImageController : Controller
{
    private readonly PhotoDbContext _photoDbContext;
    private readonly UserManager<User> _userManager;

    public ImageController(PhotoDbContext photoDbContext, UserManager<User> userManager)
    {
        _photoDbContext = photoDbContext;
        _userManager = userManager;
    }

    // Ensure the user is authenticated before accessing this action
    [AllowAnonymous]
    public IActionResult Index()
    {
        var images = _photoDbContext.Images.Include(i => i.User).ToList();
        var comments = _photoDbContext.Comments.ToList();
        var users = _photoDbContext.Users.ToList();

        var imageDetailsViewModel = new ImageDetailsViewModel(images, comments, users);
        return View("ScrollView", imageDetailsViewModel);
    }

    [Authorize]
    public IActionResult Details(int id)
    {
        var image = _photoDbContext.Images.FirstOrDefault(i => i.ImageId == id);

        if (image == null)
            return NotFound();

        var comments = _photoDbContext.Comments.Where(c => c.ImageId == id).ToList();
        var users = _photoDbContext.Users.ToList();

        var viewModel = new ImageDetailsViewModel(new List<Image> { image }, comments, users);

        return View(viewModel);
    }

    // Make sure user is authenticated before uploading
    [HttpGet]
    [Authorize]
    public IActionResult Upload()
    {
        return View();
    }

    // Only authenticated users can upload images
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Upload(ImageUploadViewModel mod)
    {
        if (mod.imageFile != null)
        {
            string filePath = Path.Combine("wwwroot/images", mod.imageFile.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await mod.imageFile.CopyToAsync(stream);
            }

            // Get the currently logged-in user
            var user = await _userManager.GetUserAsync(User);

            var image = new Image
            {
                Title = mod.Title,
                Description = mod.Description,
                ImagePath = $"/images/{mod.imageFile.FileName}",
                DateUploaded = DateTime.Now,
                UserId = user.Id
            };

            _photoDbContext.Images.Add(image);
            await _photoDbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }
        return View("Upload", mod);
    }

    // Ensure only authenticated users can delete images
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var image = await _photoDbContext.Images.FindAsync(id);

        if (image == null)
            return NotFound();

        _photoDbContext.Images.Remove(image);
        await _photoDbContext.SaveChangesAsync();

        TempData["Message"] = "Image deleted successfully!";
        return RedirectToAction("Index");
    }

    // Ensure only authenticated users can edit images
    [HttpGet]
    [Authorize]
    public IActionResult Edit(int id)
    {
        var image = _photoDbContext.Images.FirstOrDefault(i => i.ImageId == id);

        if (image == null)
            return NotFound();

        var viewModel = new ImageEditViewModel
        {
            ImageId = image.ImageId,
            Title = image.Title,
            Description = image.Description,
            ImagePath = image.ImagePath
        };

        return View(viewModel);
    }

    // POST: Edit
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Edit(ImageEditViewModel model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var image = await _photoDbContext.Images.FindAsync(model.ImageId);

        if (image == null)
            return NotFound();

        image.Title = model.Title;
        image.Description = model.Description;

        await _photoDbContext.SaveChangesAsync();
        return RedirectToAction("Details", new { id = model.ImageId });
    }

    // POST: Add Comment
    [HttpPost]
    public async Task<IActionResult> AddComment(int imageId, string commentText)
    {
        if (User.Identity.IsAuthenticated)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user != null)
            {
                var newComment = new Comment
                {
                    ImageId = imageId,
                    CommentText = commentText,
                    UserId = user.Id,
                    CommentDate = DateTime.Now
                };

                _photoDbContext.Comments.Add(newComment);
                await _photoDbContext.SaveChangesAsync();
            }
        }


        return RedirectToAction("Details", "Image", new { id = imageId });
    }
}
