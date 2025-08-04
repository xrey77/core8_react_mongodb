using AutoMapper;
using core8_react_mongodb.Entities;
using core8_react_mongodb.Models.dto;

namespace core8_react_mongodb.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<UserRegister, User>();
            CreateMap<UserLogin, User>();
            CreateMap<UserUpdate, User>();
            CreateMap<UserPasswordUpdate, User>();
            CreateMap<Product, ProductModel>();
            CreateMap<ProductsModel, Product>();
        }
    }
    

}