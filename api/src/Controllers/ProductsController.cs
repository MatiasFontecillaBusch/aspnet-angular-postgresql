using api.src.DTOs;
using api.src.Entities;
using api.src.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.src.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsService _productService;

        public ProductsController(ProductsService productsService)
        {
            _productService = productsService;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(CreateProductDto createProductDto)
        {
            var result = await _productService.CreateProduct(createProductDto); 
            return CreatedAtAction(nameof(ReadProductById), new { id = result.Id }, result);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> ReadProducts([FromQuery] GetProductsDto getProductsDto)
        {
            var paginatedResponse = await _productService.ReadProducts(getProductsDto);
            return Ok(paginatedResponse);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> ReadProductById(int id)
        {
            var result = await _productService.ReadProductById(id);
            return Ok(result);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, UpdateProductDto updateProductDto)
        {
            var result = await _productService.UpdateProduct(id, updateProductDto);
            return Ok(result);
        }


        [HttpPost("{id}/restore")]
        public async Task<ActionResult<Product>> RestoreProduct(int id, UpdateProductDto updateProductDto)
        {
            var result = await _productService.RestoreProduct(id);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            await _productService.DeleteProduct(id);
            return NoContent();
        }
    }
}
