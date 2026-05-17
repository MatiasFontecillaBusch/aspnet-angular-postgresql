using api.src.DTOs;
using api.src.Entities;
using api.src.Responses;

namespace api.src.Interfaces;

public interface IProductRepository
{
    Task<Product> CreateAsync(Product product);

    Task<PagedResponse<Product>> ReadAllAsync(GetProductsDto getProductsDto);

    Task<Product?> ReadOneAvailableByIdAsync(int id);

    Task<Product?> UpdateOneProduct(Product product);

    Task<bool> SoftDeleteProductByIdAsync(int id);

    Task<Product?> RestoreProductByIdAsync(int id);
}