using System;
using System;
using Microsoft.AspNetCore.Mvc; 
using System.ComponentModel.DataAnnotations; 
using PixNote.Data;
using System;
using System.ComponentModel.DataAnnotations;

namespace PixNote.Models
{
    public class CommentDTO
    {
        public int CommentId { get; set; }
        public string CommentText { get; set; }
        public DateTime CommentDate { get; set; }
        public string UserId { get; set; }
        public int ImageId { get; set; }
    }
}
