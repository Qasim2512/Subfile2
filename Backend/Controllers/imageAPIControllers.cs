using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using PixNote.Models; // Your model namespace, adjust as needed
using PixNote.ViewModels;

[Route("api/[controller]")]
public class imageController : Controller  // Ensure it inherits from Controller
{
    private readonly PhotoDbContext _photoDbContext;
    private readonly UserManager<User> _userManager;

    public imageController(PhotoDbContext photoDbContext, UserManager<User> userManager)
    {
        _photoDbContext = photoDbContext;
        _userManager = userManager;
    }

[AllowAnonymous]
[HttpGet("images")]
public async Task<ActionResult> GetImagesWithDetails()
{
   
    var images = await _photoDbContext.Images.Include(i => i.User).ToListAsync();
    
   
    var comments = await _photoDbContext.Comments.ToListAsync();
    var users = await _photoDbContext.Users.ToListAsync();

    
    if (images == null || !images.Any())
        return NotFound(new { message = "No images found." });

    
    var imageDetailsDto = images.Select(image => new ImageDTO
    {
        ImageId = image.ImageId,
        Title = image.Title,
        Description = image.Description,
        ImagePath = image.ImagePath,
        DateUploaded = image.DateUploaded,
        UserId = image.UserId
    }).ToList();

    
    return Ok(imageDetailsDto);
}

    

[Authorize]  // Ensure the user is authenticated to upload images
[HttpPost("uploadImage")]
public async Task<IActionResult> Upload([FromForm] ImageUploadViewModel model)
{
    // Validate the model
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState); // Return validation errors if the model is invalid
    }

    if (model.imageFile == null || model.imageFile.Length == 0)
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

    var uniqueFileName = Guid.NewGuid() + Path.GetExtension(model.imageFile.FileName);
    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

    // Use the ViewModel's file to save the image
    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await model.imageFile.CopyToAsync(stream);
    }

    var image = new Image
    {
        Title = model.Title,
        Description = model.Description,
        ImagePath = $"/uploads/{uniqueFileName}",
        DateUploaded = DateTime.Now,
        UserId = userId
    };

    _photoDbContext.Images.Add(image);
    await _photoDbContext.SaveChangesAsync();

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
[HttpDelete("images/{id}")]
[Authorize]
public async Task<IActionResult> DeleteImage(int id)
{
    // Find the image by its ID
    var image = await _photoDbContext.Images.FindAsync(id);

    // If the image doesn't exist, return a 404 Not Found response
    if (image == null)
        return NotFound(new { message = "Image not found." });

    // Remove the image from the database
    _photoDbContext.Images.Remove(image);
    await _photoDbContext.SaveChangesAsync();

    // Return a success response with a message
    return Ok(new { message = "Image deleted successfully!" });
}

[HttpPut("images/{id}")]
[Authorize]
public async Task<IActionResult> EditImage(int id, [FromForm] ImageEditViewModel model)
{
    // Ensure the user is authenticated
    var user = await _userManager.GetUserAsync(User);
    if (user == null)
    {
        return Unauthorized("User is not authenticated.");
    }

    // Find the image to edit
    var image = await _photoDbContext.Images.FindAsync(id);
    if (image == null)
    {
        return NotFound("Image not found.");
    }

    // Check if the current user is the owner of the image
    if (image.UserId != user.Id)
    {
        return Forbid("You do not have permission to edit this image.");
    }

    // Update the image properties
    image.Title = model.Title ?? image.Title;
    image.Description = model.Description ?? image.Description;

    // If a new image file is provided, update the image file
    if (model.NewImageFile != null && model.NewImageFile.Length > 0)
    {
        var uploadsFolder = Path.Combine("wwwroot", "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var uniqueFileName = Guid.NewGuid() + Path.GetExtension(model.NewImageFile.FileName);
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        // Save the new image file
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await model.NewImageFile.CopyToAsync(stream);
        }

        // Update the image path
        image.ImagePath = $"/uploads/{uniqueFileName}";
    }

    // Save changes to the database
    _photoDbContext.Images.Update(image);
    await _photoDbContext.SaveChangesAsync();

    // Return the updated image details
    var updatedImageDto = new ImageDTO
    {
        ImageId = image.ImageId,
        Title = image.Title,
        Description = image.Description,
        ImagePath = image.ImagePath,
        DateUploaded = image.DateUploaded,
        UserId = image.UserId
    };

    return Ok(new { message = "Image updated successfully.", image = updatedImageDto });
}


[HttpPost("images/{imageId}/comments")]
[Authorize]
public async Task<IActionResult> AddComment(int imageId, [FromBody] string commentText)
{
    // Check if the user is authenticated
    if (!User.Identity.IsAuthenticated)
    {
        return Unauthorized(new { message = "User is not authenticated." });
    }

    // Get the current logged-in user
    var user = await _userManager.GetUserAsync(User);

    // If user is null, return unauthorized (shouldn't happen with [Authorize] but it's a safeguard)
    if (user == null)
    {
        return Unauthorized(new { message = "User not found." });
    }

    // Create a new comment
    var newComment = new Comment
    {
        ImageId = imageId,
        CommentText = commentText,
        UserId = user.Id,
        CommentDate = DateTime.Now
    };

    // Add the comment to the database
    _photoDbContext.Comments.Add(newComment);
    await _photoDbContext.SaveChangesAsync();

    // Return success message with the newly created comment
    return Ok(new
    {
        message = "Comment added successfully.",
        comment = new
        {
            newComment.CommentId,
            newComment.ImageId,
            newComment.CommentText,
            newComment.UserId,
            newComment.CommentDate
        }
    });
}


}
