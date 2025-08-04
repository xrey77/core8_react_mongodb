namespace core8_react_mongodb.Models
{
    public class JwtResponse {
        public String token { get; set; }
        public String user_name { get; set; }
        public Int32 expires_in { get; set; }

    }

}