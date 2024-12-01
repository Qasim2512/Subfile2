using System;
using Microsoft.AspNetCore.Mvc; 
using System.ComponentModel.DataAnnotations; 
using PixNote.Data;
using System;
using System.ComponentModel.DataAnnotations;

namespace PixNote.Models
{
    public class ImageDTO
    {
        public int ImageId { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title can't be longer than 100 characters.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(500, ErrorMessage = "Description can't be longer than 500 characters.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Image path is required.")]
        [Url(ErrorMessage = "Invalid URL format.")]
        public string ImagePath { get; set; }

        public DateTime DateUploaded { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public string UserId { get; set; }
    }
}
