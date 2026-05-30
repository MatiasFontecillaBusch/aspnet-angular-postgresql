using api_framework.DTOs;
using api_framework.Entities;
using api_framework.Interfaces;
using System;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace api_framework.Controllers
{
    [RoutePrefix("api/products")] // Define la ruta base para todo el controlador
    public class ProductsController : ApiController
    {
        private readonly IProductRepository _productRepository;

        // Autofac se encarga de inyectar el repositorio automáticamente aquí
        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // GET: api/products
        // Soporta filtros opcionales y paginación mediante QueryString: api/products?page=1&pageSize=10&name=lapto
        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetAll([FromUri] GetProductsDto getProductsDto)
        {
            if (getProductsDto == null)
            {
                getProductsDto = new GetProductsDto();
            }

            // Validamos que el PageSize no rompa el [Range(1,200)] de tu PagingDto
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Si el cliente no envía los datos de paginación, el constructor del DTO ya tiene 1 y 10 por defecto
            var productsPaged = await _productRepository.ReadAllAsync(getProductsDto);
            return Ok(productsPaged);
        }

        // GET: api/products/5
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> GetById(int id)
        {
            var product = await _productRepository.ReadOneAvailableByIdAsync(id);

            if (product == null)
            {
                return NotFound(); // Retorna un HTTP 404
            }

            return Ok(product); // Retorna un HTTP 200 con el objeto
        }

        // POST: api/products
        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("El cuerpo del producto no puede estar vacío.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Si tienes anotaciones [Required] en tu entidad Product
            }

            var createdProduct = await _productRepository.CreateAsync(product);

            // Retorna un HTTP 201 Created indicando la URL dónde se puede consultar el nuevo recurso
            return Created(new Uri(Request.RequestUri + "/" + createdProduct.Id), createdProduct);
        }

        // PUT: api/products
        [HttpPut]
        [Route("")]
        public async Task<IHttpActionResult> Update([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("El producto a actualizar no puede estar vacío.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validamos primero si el producto existe antes de intentar modificarlo
            var existingProduct = await _productRepository.ReadOneAvailableByIdAsync(product.Id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            var updatedProduct = await _productRepository.UpdateOneProduct(product);
            return Ok(updatedProduct);
        }

        // DELETE: api/products/5 (Borrado Suave)
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var success = await _productRepository.SoftDeleteProductByIdAsync(id);

            if (!success)
            {
                return NotFound(); // Si el ID no existía
            }

            return StatusCode(HttpStatusCode.NoContent); // HTTP 204: Todo salió bien pero no devuelvo contenido
        }

        // POST: api/products/5/restore (Restaurar producto borrado)
        [HttpPost]
        [Route("{id:int}/restore")]
        public async Task<IHttpActionResult> Restore(int id)
        {
            var restoredProduct = await _productRepository.RestoreProductByIdAsync(id);

            if (restoredProduct == null)
            {
                return NotFound();
            }

            return Ok(restoredProduct);
        }
    }
}