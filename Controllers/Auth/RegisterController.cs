using System.Diagnostics;
using core8_react_mongodb.Models.dto;
using core8_react_mongodb.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using core8_react_mongodb.Entities;
using core8_react_mongodb.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System.IO;

namespace core8_react_mongodb.Controllers.Auth
{
    
[ApiExplorerSettings(GroupName = "Sign-up or Account Registration")]
[ApiController]
[Route("[controller]")]
public class RegisterController : ControllerBase
{
    private IAuthService _authService;
    // private EmailService _emailService;    
    private IMapper _mapper;
    private readonly IWebHostEnvironment _env;
    private readonly IConfiguration _configuration;  
    private readonly ILogger<RegisterController> _logger;
    
    public RegisterController(
        IWebHostEnvironment env,
        IAuthService userService,
        // EmailService emailService,
        IConfiguration configuration,
        IMapper mapper,
        ILogger<RegisterController> logger
        )
    {   
        _authService = userService;
        // _emailService = emailService;
        _configuration = configuration;  
        _mapper = mapper;
        _logger = logger;
        _env = env;
    }  

    [HttpPost("/signup")]
    public IActionResult signup(UserRegister model) {
        DateTime now = DateTime.Now;
        var user = _mapper.Map<User>(model);
            try
            {
                user.LastName = model.Lastname;
                user.FirstName = model.Firstname;
                user.Email = model.Email;
                user.Mobile = model.Mobile;
                user.UserName = model.Username;
                user.Isactivated = 1;
                user.CreatedAt = now;                
                _authService.SignupUser(user, model.Password);
/*            
                String fullname = model.Firstname + " " + model.Lastname;
                String emailaddress = model.Email;
                String htmlmsg = "<div><p>Please click Activate button below to confirm you email address and activate your account.</p>" +
                            "<a href=\"https://localhost:7280/api/activateuser/id=" + user.Id + "\" style=\"background-color: green;color:white;text-decoration: none;border-radius: 20px; \">&nbsp;&nbsp; Activate Account &nbsp;&nbsp;</a></div>";
                String subject = "Barclays Account Activation";                
                _emailService.sendMail(emailaddress, fullname, subject, htmlmsg);
*/
                return Ok(new {message = "Please check your e-mail inbox and click button activation"});
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
    }



}
    
}