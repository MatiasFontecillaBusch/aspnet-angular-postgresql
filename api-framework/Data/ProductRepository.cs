using System;
using System.Data.Entity; // <-- IMPORTANTE: Cambió el namespace para EF6
using System.Linq;
using System.Threading.Tasks;
using api_framework.DTOs;
using api_framework.Entities;
using api_framework.Interfaces;
using api_framework.Responses;

namespace api_framework.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> CreateAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<PagedResponse<Product>> ReadAllAsync(GetProductsDto getProductsDto)
        {
            // AsNoTracking() y AsQueryable() funcionan igual en EF6
            var query = _context.Products.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(getProductsDto.Name))
            {
                var searchTerm = getProductsDto.Name.Trim().ToLower();
                query = query.Where(x => x.Name != null && x.Name.ToLower().Contains(searchTerm));
            }

            if (getProductsDto.IsAvailable != null)
            {
                query = query.Where(x => x.IsAvailable == getProductsDto.IsAvailable);
            }

            query = query.OrderByDescending(x => x.Id);

            var result = await PagedHelper.CreateAsync(
                query,
                getProductsDto.Page,
                getProductsDto.PageSize,
                x => x.Id,
                isDescending: true
            );

            return result;
        }

        // CAMBIO: Quitamos el 'Product?' por 'Product' ya que en .NET Legacy todos los objetos pueden ser null
        public async Task<Product> ReadOneAvailableByIdAsync(int id)
        {
            return await _context.Products
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id && p.IsAvailable);
        }

        public async Task<Product> UpdateOneProduct(Product product)
        {
            // CAMBIO CRÍTICO: EF6 no tiene .Update(). Se hace mediante el Entry State.
            _context.Entry(product).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<bool> SoftDeleteProductByIdAsync(int id)
        {
            // FindAsync funciona exactamente igual en EF6
            var product = await _context.Products.FindAsync(id);

            if (product == null) return false;

            product.IsAvailable = false;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Product> RestoreProductByIdAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return null;

            product.IsAvailable = true;

            await _context.SaveChangesAsync();
            return product;
        }
    }
}