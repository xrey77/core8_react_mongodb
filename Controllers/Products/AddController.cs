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

namespace core8_react_mongodb.Controllers.Products
{
    
[ApiExplorerSettings(GroupName = "Sign-up or Account Registration")]
[ApiController]
[Route("[controller]")]
public class AddController : ControllerBase
{
    private IProductService _productService;
    private IMapper _mapper;
    private readonly IWebHostEnvironment _env;
    private readonly IConfiguration _configuration;  
    private readonly ILogger<AddController> _logger;
    
    public AddController(
        IWebHostEnvironment env,
        IProductService productService,
        IConfiguration configuration,
        IMapper mapper,
        ILogger<AddController> logger
        )
    {   
        _productService = productService;
        _configuration = configuration;  
        _mapper = mapper;
        _logger = logger;
        _env = env;
    }  

    [HttpPost("/api/addproduct")]
    public IActionResult crateProduct(ProductsModel model) {
        DateTime now = DateTime.Now;
        var prods = _mapper.Map<Product>(model);
            try
            {
                prods.Category = model.Category;
                prods.Descriptions = model.Descriptions;
                prods.Qty = model.Qty;
                prods.Unit = model.Unit;
                prods.CostPrice = model.CostPrice;
                prods.SellPrice = model.SellPrice;
                prods.SalePrice = model.SalePrice;
                prods.ProductPicture = model.ProductPicture;
                prods.AlertStocks = model.AlertStocks;
                prods.CriticalStocks = model.CriticalStocks;                
                prods.CreatedAt = now;      
                _productService.addProduct(prods);
                return Ok(new {message = "New product has been added."});
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
    }



}
    
}