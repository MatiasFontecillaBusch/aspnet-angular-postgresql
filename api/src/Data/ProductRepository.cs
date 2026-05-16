using api.src.DTOs;
using api.src.Entities;
using api.src.Interfaces;
using api.src.Responses;
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
    public async Task<PagedResponse<Product>> ReadAvailableAsync(GetProductsDto getProductsDto)
    {
        var query = _context.Products
            .AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(getProductsDto.Name))
        {
            var searchTerm = getProductsDto.Name.Trim().ToLower();
            Console.Write(searchTerm);
            query = query.Where(x => x.Name != null && x.Name.ToLower().Contains(searchTerm));
        }

        if (getProductsDto.IsAvailable != null)
        {
            query = query.Where(x => x.IsAvailable == getProductsDto.IsAvailable);
        }
        query = query.OrderByDescending(x => x.Id);
        
        var result = await PagedHelper.CreateAsync<Product>(query, getProductsDto.Page, getProductsDto.PageSize);

        return result;
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
    public async Task<Product?> RestoreProductByIdAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null) return null;

        product.IsAvailable = true;

        await _context.SaveChangesAsync();
        return product;
    }
}
