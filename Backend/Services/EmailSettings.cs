using Microsoft.AspNetCore.Identity.UI.Services;
using System.Threading.Tasks;

namespace PixNote.Services
{
    public class DummyEmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            
            // Simulate a successful email send by returning a completed task
            return Task.CompletedTask;
        }
    }
}
