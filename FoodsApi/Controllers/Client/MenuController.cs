using AutoMapper;
using FoodsApi.Data;
using FoodsApi.DTOs.Feedback;
using FoodsApi.DTOs.Meals;
using FoodsApi.DTOs.Orders;
using FoodsApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FoodsApi.Controllers.Client
{

[Route("api/client/[controller]")]
[ApiController]
public class MenuController : ControllerBase
{
    private readonly RestaurantContext _context;
    private readonly IMapper _mapper;

    public MenuController(RestaurantContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize(Roles = "Client")] 

    public async Task<ActionResult<IEnumerable<MealResponseDTO>>> GetAvailableMeals()
    {
        var meals = await _context.Meals
            .Include(m => m.Ingredients)
            .ToListAsync();
            
        return _mapper.Map<List<MealResponseDTO>>(meals);
    }

    [HttpPost("orders")]
    [Authorize(Roles = "Client")] 

public async Task<ActionResult<OrderResponseDTO>> PlaceOrder(OrderCreateDTO dto)
{
    // Fetch the meal from the database
    var meal = await _context.Meals
        .Include(m => m.Ingredients)
        .FirstOrDefaultAsync(m => m.Id == dto.MealId);

    if (meal == null)
    {
        return NotFound("Meal not found");
    }

    var order = new Order
    {
        MealId = dto.MealId,
        Status = "Pending",
        CreatedAt = DateTime.UtcNow
    };

    _context.Orders.Add(order);
    await _context.SaveChangesAsync();

    // Map the order to OrderResponseDTO and include the meal
    var orderResponse = _mapper.Map<OrderResponseDTO>(order);
    orderResponse.Meal = _mapper.Map<MealResponseDTO>(meal);

    return CreatedAtAction(nameof(PlaceOrder), orderResponse);
}

    [HttpPost("feedback")]
    [Authorize(Roles = "Client")] 

    public async Task<ActionResult> SubmitFeedback(FeedbackCreateDTO dto)
    {
        var feedback = new Feedback
        {
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow
        };

        _context.Feedbacks.Add(feedback);
        await _context.SaveChangesAsync();
        
        return Ok();
    }
}}