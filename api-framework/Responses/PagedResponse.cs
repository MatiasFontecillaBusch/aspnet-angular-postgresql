using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace api_framework.Responses
{
    public class PagedResponse<T>
    {
        // En C# antiguo inicializamos con una lista vacía para evitar el error de sintaxis del '[]'
        public IEnumerable<T> Items { get; set; } = new List<T>();
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
        public bool HasPreviousPage => PageNumber > 1;
        public bool HasNextPage => PageNumber < TotalPages;
    } // Nota: Quitamos el ';' al final de la clase, inválido en versiones viejas de C#

    public class PagedHelper
    {
        public static async Task<PagedResponse<T>> CreateAsync<T, TKey>(
            IQueryable<T> query,
            int pageNumber,
            int pageSize,
            Expression<Func<T, TKey>> orderByExpression,
            bool isDescending = true)
        {
            // CountAsync() ahora corre bajo Entity Framework 6 con System.Data.Entity
            var count = await query.CountAsync();

            if (isDescending)
                query = query.OrderByDescending(orderByExpression);
            else
                query = query.OrderBy(orderByExpression);

            // ToListAsync() ahora corre bajo Entity Framework 6
            var items = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

            return new PagedResponse<T>
            {
                TotalCount = count,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Items = items
            };
        }
    }
}