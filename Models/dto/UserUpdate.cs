using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace core8_react_mongodb.Models.dto
{
  public class UserUpdate
    {        
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Mobile { get; set; }
    }

    
}