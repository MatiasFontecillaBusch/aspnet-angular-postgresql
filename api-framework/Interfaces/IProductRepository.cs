using System;
using System.Threading.Tasks;
using api_framework.DTOs;
using api_framework.Entities;
using api_framework.Responses;

namespace api_framework.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> CreateAsync(Product product);
        
        Task<PagedResponse<Product>> ReadAllAsync(GetProductsDto getProductsDto);
        
        Task<Product> ReadOneAvailableByIdAsync(int id);
        
        Task<Product> UpdateOneProduct(Product product);
        
        Task<bool> SoftDeleteProductByIdAsync(int id);
        
        Task<Product> RestoreProductByIdAsync(int id);
    }
}