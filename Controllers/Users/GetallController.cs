using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using System;
using core8_react_mongodb.Services;
using core8_react_mongodb.Entities;
using core8_react_mongodb.Models.dto;
using core8_react_mongodb.Helpers;

namespace core8_react_mongodb.Controllers.Users
{
    [ApiExplorerSettings(GroupName = "List All Users")]
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GetallController : ControllerBase {
       

    private IUserService _userService;

    private IMapper _mapper;
    private readonly IConfiguration _configuration;  

    private readonly IWebHostEnvironment _env;

    private readonly ILogger<GetallController> _logger;

    public GetallController(
        IConfiguration configuration,
        IWebHostEnvironment env,
        IUserService userService,
        IMapper mapper,
        ILogger<GetallController> logger
        )
    {
        _configuration = configuration;  
        _userService = userService;
        _mapper = mapper;
        _logger = logger;
        _env = env;        
    }  

        [HttpGet("/api/getall")]
        public IActionResult getAllusers() {
            try {                
                var user = _userService.GetAll();
                var model = _mapper.Map<IList<UserModel>>(user);
                return Ok(model);
            } catch(AppException ex) {
               return BadRequest(new {message = ex.Message});
            }
        }
    }
    
}