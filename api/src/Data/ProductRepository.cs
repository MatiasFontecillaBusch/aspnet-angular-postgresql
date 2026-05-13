using api.src.Entities;
using api.src.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.src.Data;

public class ProductRepository
{
    private readonly AppDbContext _context;
    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<Product> CreateAsync(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return product;
    }
    public async Task<(IEnumerable<Product> Items, int TotalCount)> ReadAvailableAsync(int page, int pageSize)
    {
        var query = _context.Products
            .AsNoTracking()
            .Where(p => p.IsAvailable);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(p => p.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }
    public async Task<Product?> ReadOneAvailableByIdAsync(int id)
    {
        return await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id && p.IsAvailable);
    }
    public async Task<Product?> UpdateOneProduct(Product product)
    {
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<bool> SoftDeleteProductByIdAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null) return false;

        product.IsAvailable = false;

        await _context.SaveChangesAsync();
        return true;
    }
}
