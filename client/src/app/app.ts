import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductService } from '../core/services/product-service';
import { PagedResponse } from '../types/responses';
import { Product, ProductsParams } from '../types/product';
import { CurrencyPipe } from '@angular/common';
import { Paginator } from '../shared/paginator/paginator';
import { EditProductForm } from '../features/products/edit-product-form/edit-product-form';
import { CreateProductForm } from "../features/products/create-product-form/create-product-form";
import { DeleteProductButton } from "../features/products/delete-product-button/delete-product-button";
import { RestoreProductButton } from "../features/products/restore-product-button/restore-product-button";

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, Paginator, EditProductForm, CreateProductForm, DeleteProductButton, RestoreProductButton],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private editModal = viewChild<ElementRef<HTMLDialogElement>>('editModal');
  private createModal = viewChild<ElementRef<HTMLDialogElement>>('createModal');
  protected readonly title = signal('client');
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  protected paginatedProducts = signal<PagedResponse<Product> | null>(null);
  protected selectedProduct = signal<Product | null>(null);
  protected productsParams = signal<ProductsParams>({
    page: 1,
    pageSize: 10,
  });

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;

    if (queryParams['page'] || queryParams['pageSize']) {
      this.productsParams.update((prev) => ({
        ...prev,
        page: queryParams['page'] ? +queryParams['page'] : prev.page,
        pageSize: queryParams['pageSize'] ? +queryParams['pageSize'] : prev.pageSize,
      }));
    }
    this.loadProducts();
  }

  onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.productsParams.set({
      page: event.pageNumber,
      pageSize: event.pageSize,
    });
    this.loadProducts();
  }

  loadProducts() {
    console.log("LOAD")
    this.productService.readProducts(this.productsParams()).subscribe({
      next: (result) => this.paginatedProducts.set(result),
    });
  }

  openEditModal(product: Product) {
    this.selectedProduct.set(product);
    this.editModal()?.nativeElement.showModal(); // Método nativo para abrir modal
  }

  closeModal() {
    this.editModal()?.nativeElement.close();
    this.loadProducts(); // Recargar la tabla tras editar
  }

  openCreateModal() {
    console.log("CREATE")
    this.createModal()?.nativeElement.showModal(); // Método nativo para abrir modal
  }

  closeCreateModal() {
    this.createModal()?.nativeElement.close();
    this.loadProducts(); // Recargar la tabla tras editar
  }
}
