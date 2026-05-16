using System;
using api.src.DTOs;
using api.src.Entities;
using api.src.Responses;

namespace api.src.Interfaces;

interface IProductsService
{
    Task<Product> CreateProduct(CreateProductDto createProductDto);
    Task<Product> ReadProductById(int id);
    Task<PagedResponse<Product>> ReadProducts(GetProductsDto getProductsDto);
    Task<Product> UpdateProduct(int id, UpdateProductDto updateProductDto);
    Task DeleteProduct(int id);
    Task<Product> RestoreProduct(int id);

}