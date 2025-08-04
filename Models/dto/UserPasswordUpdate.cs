using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace core8_react_mongodb.Models.dto
{
  public class UserPasswordUpdate
    {        
        public string Id { get; set; }
        public string Password { get; set; }
    }

    
}