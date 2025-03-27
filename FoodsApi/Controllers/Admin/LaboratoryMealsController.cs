using AutoMapper;
using FoodsApi.Data;
using FoodsApi.DTOs.Feedback;
using FoodsApi.DTOs.Meals;
using FoodsApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FoodsApi.Controllers.Admin
{
    
[ApiController]
[Route("api/admin/laboratory/meals")]
public class LaboratoryMealsController : ControllerBase
{
    private readonly RestaurantContext _context;
    private readonly IMapper _mapper;

    public LaboratoryMealsController(RestaurantContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // GET: api/admin/laboratory/meals
    [HttpGet]
    [Authorize(Roles = "Admin")] 

    public async Task<ActionResult<IEnumerable<MealResponseDTO>>> GetMeals()
    {
        var meals = await _context.Meals
            .Include(m => m.Ingredients)
            .ToListAsync();
        return _mapper.Map<List<MealResponseDTO>>(meals);
    }

    // GET: api/admin/laboratory/meals/5
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")] 

    public async Task<ActionResult<MealResponseDTO>> GetMeal(int id)
    {
        var meal = await _context.Meals
            .Include(m => m.Ingredients)
            .FirstOrDefaultAsync(m => m.Id == id);
            
        if (meal == null) return NotFound();
        return _mapper.Map<MealResponseDTO>(meal);
    }

    // POST: api/admin/laboratory/meals
    [HttpPost]
    [Authorize(Roles = "Admin")] 

    public async Task<ActionResult<MealResponseDTO>> CreateMeal(
        [FromBody] MealCreateDTO dto)
    {
        var meal = new Meal
        {
            Name = dto.Name,
            Ingredients = await GetValidIngredients(dto.IngredientIds)
        };

        _context.Meals.Add(meal);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetMeal), 
            new { id = meal.Id },
            _mapper.Map<MealResponseDTO>(meal));
    }

    // PUT: api/admin/laboratory/meals/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")] 

    public async Task<IActionResult> UpdateMeal(int id, 
        [FromBody] MealUpdateDTO dto)
    {
        if (id != dto.Id) return BadRequest();
        
        var meal = await _context.Meals
            .Include(m => m.Ingredients)
            .FirstOrDefaultAsync(m => m.Id == id);
            
        if (meal == null) return NotFound();

        _mapper.Map(dto, meal);
        meal.Ingredients = await GetValidIngredients(dto.IngredientIds);
        
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/admin/laboratory/meals/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")] 

    public async Task<IActionResult> DeleteMeal(int id)
    {
        var meal = await _context.Meals.FindAsync(id);
        if (meal == null) return NotFound();

        _context.Meals.Remove(meal);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }

    private async Task<List<MealIngredient>> GetValidIngredients(List<int> ingredientIds)
    {
        return await _context.MealIngredients
            .Where(i => ingredientIds.Contains(i.Id))
            .ToListAsync();
    }


       [HttpGet("feedback")]
     [Authorize(Roles = "Admin")] 
   public async Task<ActionResult<IEnumerable<FeedbackResponseDTO>>> GetFeedback()
        {
            // Fetch all feedback entries from the database
            var feedback = await _context.Feedbacks.ToListAsync();

            // Map the feedback entities to FeedbackResponseDTO
            return _mapper.Map<List<FeedbackResponseDTO>>(feedback);
        }
}}