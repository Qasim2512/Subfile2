using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PixNote.Models;
using PixNote.ViewModels;


public class ImageController : Controller
{
    private readonly PhotoDbContext _photoDbContext;
    private readonly UserManager<User> _userManager;

    public ImageController(PhotoDbContext photoDbContext, UserManager<User> userManager)
    {
        _photoDbContext = photoDbContext;
        _userManager = userManager;
    }

    
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

    
    [HttpGet]
    [Authorize]
    public IActionResult Upload()
    {
        return View();
    }

    
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


        return RedirectToAction("Index", "Image", new { id = imageId });
    }
}