using AutoMapper;
using FoodsApi.DTOs.Auth;
using FoodsApi.DTOs.Ingredients;
using FoodsApi.DTOs.Meals;
using FoodsApi.DTOs.Orders;
using FoodsApi.DTOs.Feedback;
using FoodsApi.Models;

namespace FoodsApi.Configuration
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Authentication mappings
            CreateMap<RegisterDTO, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // PasswordHash is set manually
                .ForMember(dest => dest.VerificationCode, opt => opt.Ignore()) // VerificationCode is generated manually
                .ForMember(dest => dest.IsVerified, opt => opt.Ignore()) // IsVerified is set manually
                .ForMember(dest => dest.RoleId, opt => opt.Ignore()); // RoleId is set internally

           
            CreateMap<User, VerificationResponseDTO>();
            CreateMap<User, ResetPasswordResponseDTO>();

            // Ingredients mappings
            CreateMap<MealIngredient, IngredientResponseDTO>();
            CreateMap<IngredientCreateDTO, MealIngredient>();

            // Meals mappings
            CreateMap<MealCreateDTO, Meal>();
            CreateMap<Meal, MealResponseDTO>()
                .ForMember(dest => dest.Ingredients, opt => opt.MapFrom(src => src.Ingredients));

            // Orders mappings
            CreateMap<Order, OrderResponseDTO>()
                .ForMember(dest => dest.Meal, opt => opt.MapFrom(src => src.Meal));

            // Feedback mappings
            CreateMap<Feedback, FeedbackResponseDTO>()
                .ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));
        }
    }
}