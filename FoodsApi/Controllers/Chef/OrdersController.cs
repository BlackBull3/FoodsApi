using AutoMapper;
using FoodsApi.Data;
using FoodsApi.DTOs.Orders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FoodsApi.Controllers.Chef
{

[Route("api/chef/[controller]")]
[ApiController]

public class OrdersController : ControllerBase
{
    private readonly RestaurantContext _context;
    private readonly IMapper _mapper;

    public OrdersController(RestaurantContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize(Roles = "Chef")] 

    public async Task<ActionResult<IEnumerable<OrderResponseDTO>>> GetKitchenOrders()
    {
        var orders = await _context.Orders
            .Where(o => o.Status != "Completed")
            .Include(o => o.Meal)
            .ThenInclude(m => m.Ingredients)
            .ToListAsync();

        return _mapper.Map<List<OrderResponseDTO>>(orders);
    }

   [HttpPatch("{id}/status")]
   [Authorize(Roles = "Chef")] 

public async Task<IActionResult> UpdateOrderStatus(
    int id, 
    [FromBody] UpdateStatusDTO dto) // Use DTO instead of raw string
{
    var order = await _context.Orders.FindAsync(id);
    if (order == null) return NotFound();

    order.Status = dto.Status; // Access the DTO property
    await _context.SaveChangesAsync();
    
    return NoContent();
}
}

}