import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateProductDto, Product, ProductsParams, UpdateProductDto } from '../../types/product';
import { PagedResponse } from '../../types/responses';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/products`;

  createProduct(dto: CreateProductDto) {
    return this.http.post<Product>(`${this.baseUrl}`, dto);
  }

  readProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  readProducts(params: ProductsParams) {
    return this.http.get<PagedResponse<Product>>(this.baseUrl, {
      params: {
        page: params.page?.toString() ?? '1',
        pageSize: params.pageSize?.toString() ?? '10',
        name: params.name ?? '',
        isAvailable:
          params.isAvailable !== null && params.isAvailable !== undefined
            ? params.isAvailable.toString()
            : '',
      },
    });
  }

  updateProduct(id: number, dto: UpdateProductDto) {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, dto);
  }

  deleteProduct(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  restoreProduct(id: number) {
    return this.http.post<Product>(`${this.baseUrl}/${id}/restore`, {});
  }
}
