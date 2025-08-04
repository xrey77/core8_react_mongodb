using AutoMapper;
using core8_react_mongodb.Entities;
using core8_react_mongodb.Models;
using core8_react_mongodb.Models.dto;
using core8_react_mongodb.Services;
using Microsoft.AspNetCore.Mvc;
using Google.Authenticator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;

namespace core8_react_mongodb.Controllers.Users
{
    [ApiExplorerSettings(GroupName = "Enable or Disable 2-Factor Authentication")]
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ActivatemfaController : ControllerBase {

    private IUserService _userService;
    private IMapper _mapper;
    private readonly IConfiguration _configuration;  
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<ActivatemfaController> _logger;

    public ActivatemfaController(
        IConfiguration configuration,
        IWebHostEnvironment env,
        IUserService userService,
        IMapper mapper,
        ILogger<ActivatemfaController> logger
        )
    {
        _configuration = configuration;  
        _userService = userService;
        _mapper = mapper;
        _logger = logger;
        _env = env;        
    }  

        [HttpPut("/api/enablemfa/{id}")]
        public IActionResult EnableMFA(string id, [FromBody]MfaModel model) {
            if (model.Twofactorenabled == true) {
                User user = _userService.GetById(id);
                if(user is not null) {
                    QRCode qrimageurl = new QRCode();
                    var fullname = user.FirstName + " " + user.LastName;
                    TwoFactorAuthenticator twoFactor = new TwoFactorAuthenticator();
                    var setupInfo = twoFactor.GenerateSetupCode(fullname, user.Email, user.Secretkey, false, 3);
                    var imageUrl = setupInfo.QrCodeSetupImageUrl;
                    _userService.ActivateMfa(id, imageUrl);
                    return Ok(new {statuscode = 200, message="2-Factor Authenticator has been enabled."});
                } else {
                    return BadRequest(new {statuscode = 404, message="User not found."});
                }
            } else {
                _userService.ActivateMfa(id, null);
                return Ok(new {statuscode = 200, message="2-Factor Authenticator has been disabled."});
            }
        }
    }    
}