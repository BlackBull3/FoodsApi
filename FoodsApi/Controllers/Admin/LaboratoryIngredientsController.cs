using AutoMapper;
using FoodsApi.Data;
using FoodsApi.DTOs.Ingredients;
using FoodsApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FoodsApi.Controllers.Admin
{

[ApiController]
[Route("api/admin/laboratory/ingredients")]
public class LaboratoryIngredientsController : ControllerBase
{
    private readonly RestaurantContext _context;
    private readonly IMapper _mapper;

    public LaboratoryIngredientsController(RestaurantContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // GET: api/admin/laboratory/ingredients
    [HttpGet]
    [Authorize(Roles = "Admin")] 

    public async Task<ActionResult<IEnumerable<IngredientResponseDTO>>> GetIngredients()
    {
        var ingredients = await _context.MealIngredients.ToListAsync();
        return _mapper.Map<List<IngredientResponseDTO>>(ingredients);
    }

    // GET: api/admin/laboratory/ingredients/5
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")] 

    public async Task<ActionResult<IngredientResponseDTO>> GetIngredient(int id)
    {
        var ingredient = await _context.MealIngredients.FindAsync(id);
        if (ingredient == null) return NotFound();
        return _mapper.Map<IngredientResponseDTO>(ingredient);
    }

    // POST: api/admin/laboratory/ingredients
    [HttpPost]
    [Authorize(Roles = "Admin")] 

    public async Task<ActionResult<IngredientResponseDTO>> CreateIngredient(
        [FromBody] IngredientCreateDTO dto)
    {
        var ingredient = _mapper.Map<MealIngredient>(dto);
        ingredient.Meals = new List<Meal>();
        
        _context.MealIngredients.Add(ingredient);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetIngredient), 
            new { id = ingredient.Id },
            _mapper.Map<IngredientResponseDTO>(ingredient));
    }

    // PUT: api/admin/laboratory/ingredients/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")] 

    public async Task<IActionResult> UpdateIngredient(int id, 
        [FromBody] IngredientUpdateDTO dto)
    {
        if (id != dto.Id) return BadRequest();
        
        var ingredient = await _context.MealIngredients.FindAsync(id);
        if (ingredient == null) return NotFound();

        _mapper.Map(dto, ingredient);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }

    // DELETE: api/admin/laboratory/ingredients/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")] 

    public async Task<IActionResult> DeleteIngredient(int id)
    {
        var ingredient = await _context.MealIngredients.FindAsync(id);
        if (ingredient == null) return NotFound();

        _context.MealIngredients.Remove(ingredient);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}}