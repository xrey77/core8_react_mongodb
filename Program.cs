using System.Diagnostics;
using MongoDB.Driver;
using System.IO;
using System.Text;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.FileProviders;
using Swashbuckle.AspNetCore.SwaggerGen;
using core8_react_mongodb.Services;
using core8_react_mongodb.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
Console.WriteLine(builder.Configuration.GetSection(nameof(MongoDBSettings)));

// Configure MongoDB settings
builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDB"));

// Register MongoClient as a singleton
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<MongoDBSettings>>().Value;
    return new MongoClient(settings.ConnectionURI);
});

// Register IMongoDatabase as a singleton
builder.Services.AddSingleton<IMongoDatabase>(sp =>
{
    var settings = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<MongoDBSettings>>().Value;
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "BARCLAYS BANK", Description="RESTful API Documentation", Version = "v1" });
        c.TagActionsBy(api =>
            {
                if (api.GroupName != null)
                {
                    return new[] { api.GroupName };
                }
                throw new InvalidOperationException("Unable to determine tag for endpoint.");
            });
        c.DocInclusionPredicate((name, api) => true);        
    });


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddCors();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJWTTokenServices, JWTServiceManage>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.UseCors( options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
// app.UseRouting();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "");
    });    
    app.UseHsts();    
}

app.UseStatusCodePages(async context =>
    {
        if (context.HttpContext.Request.Path.StartsWithSegments("/api"))
        {
            if (!context.HttpContext.Response.ContentLength.HasValue || context.HttpContext.Response.ContentLength == 0)
            {
                // Change ContentType as json serialize
                context.HttpContext.Response.ContentType = "text/json";
                await context.HttpContext.Response.WriteAsJsonAsync(new {message = "Unauthorized Access, Please Login using your account."});
            }
        }
        else
        {
            // Ignore redirect
            context.HttpContext.Response.Redirect($"/error?code={context.HttpContext.Response.StatusCode}");
        }
    });



app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
