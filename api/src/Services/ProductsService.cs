using System;
using api.src.Data;
using api.src.DTOs;
using api.src.Entities;
using api.src.Exceptions;
using api.src.Interfaces;
using api.src.Responses;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.src.Services;

public class ProductsService : IProductsService
{
    private readonly ProductRepository _productRepository;
    public ProductsService(ProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<Product> CreateProduct(CreateProductDto createProductDto)
    {
        var product = new Product
        {
            Name = createProductDto.Name!,
            Price = createProductDto.Price!.Value,
            Stock = createProductDto.Stock!.Value
        };

        return await this._productRepository.CreateAsync(product);
    }
    public async Task<Product> ReadProductById(int id)
    {
        var product = await this._productRepository.ReadOneAvailableByIdAsync(id);

        if (product == null) throw new AppError("No se encontró un producto con esa id", 404);

        return product;
    }
    public async Task<PagedResponse<Product>> ReadProducts(GetProductsDto getProductsDto)
    {
        return await _productRepository.ReadAvailableAsync(getProductsDto);
    }
    public async Task<Product> UpdateProduct(int id, UpdateProductDto updateProductDto)
    {
        var existingProduct = await _productRepository.ReadOneAvailableByIdAsync(id);

        if (existingProduct == null)
        {
            throw new AppError("No se encontró el producto para actualizar", 404);
        }

        existingProduct.Name = updateProductDto.Name ?? existingProduct.Name;
        existingProduct.Price = updateProductDto.Price ?? existingProduct.Price;
        existingProduct.Stock = updateProductDto.Stock ?? existingProduct.Stock;

        var updatedProduct = await _productRepository.UpdateOneProduct(existingProduct);

        return updatedProduct!;
    }
    public async Task DeleteProduct(int id)
    {
        var result = await _productRepository.SoftDeleteProductByIdAsync(id);
        if (!result) throw new AppError("No se encontró el producto para eliminar", 404);
    }
    public async Task<Product> RestoreProduct(int id)
    {
        var result = await _productRepository.RestoreProductByIdAsync(id);
        if (result == null) throw new AppError("No se encontró el producto para restaurar", 404);
        return result;
    }

}
