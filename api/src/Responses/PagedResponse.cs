using System;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace api.src.Responses;

public class PagedResponse<T>
{
    public IEnumerable<T> Items { get; set; } = [];
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasPreviousPage => PageNumber > 1;
    public bool HasNextPage => PageNumber < TotalPages;
};

public class PagedHelper
{
    public static async Task<PagedResponse<T>> CreateAsync<T, TKey>(IQueryable<T> query, int pageNumber, int pageSize,
        Expression<Func<T, TKey>> orderByExpression,
        bool isDescending = true)
    {
        var count = await query.CountAsync();

        if (isDescending)
            query = query.OrderByDescending(orderByExpression);
        else
            query = query.OrderBy(orderByExpression);

        var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize).ToListAsync();

        return new PagedResponse<T>
        {
            TotalCount = count,
            PageNumber = pageNumber,
            PageSize = pageSize,
            Items = items
        };
    }
}