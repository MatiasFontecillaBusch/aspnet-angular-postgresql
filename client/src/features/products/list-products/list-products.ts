import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PagedResponse } from '../../../types/responses';
import { Product, ProductsParams } from '../../../types/product';
import { ProductService } from '../../../core/services/product-service';
import { CurrencyPipe } from '@angular/common';
import { Paginator } from '../../../shared/paginator/paginator';
import { EditProductForm } from '../edit-product-form/edit-product-form';
import { CreateProductForm } from '../create-product-form/create-product-form';
import { DeleteProductButton } from '../delete-product-button/delete-product-button';
import { RestoreProductButton } from '../restore-product-button/restore-product-button';
import { StockFormatPipe } from '../../../core/pipes/stock-pipe';
import { DetailsProductsSideCard } from '../details-products-side-card/details-products-side-card';

@Component({
  selector: 'app-list-products',
  imports: [
    CurrencyPipe,
    Paginator,
    EditProductForm,
    CreateProductForm,
    DeleteProductButton,
    RestoreProductButton,
    StockFormatPipe,
    DetailsProductsSideCard,
  ],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})
export class ListProducts {
  private editModal = viewChild<ElementRef<HTMLDialogElement>>('editModal');
  private createModal = viewChild<ElementRef<HTMLDialogElement>>('createModal');
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private router = inject(Router);
  protected readonly title = signal('client');
  protected paginatedProducts = signal<PagedResponse<Product> | null>(null);
  protected selectedProduct = signal<Product | null>(null);
  protected isSideBarOpen = signal<boolean>(false);
  protected productsParams = signal<ProductsParams>({
    page: 1,
    pageSize: 10,
    name: '',
    isAvailable: null,
  });

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;

    if (
      queryParams['page'] ||
      queryParams['pageSize'] ||
      queryParams['name'] ||
      queryParams['isAvailable']
    ) {
      this.productsParams.update((prev) => ({
        ...prev,
        page: queryParams['page'] ? +queryParams['page'] : prev.page,
        pageSize: queryParams['pageSize'] ? +queryParams['pageSize'] : prev.pageSize,
        name: queryParams['name'] ? queryParams['name'] : prev.name,
        isAvailable:
          queryParams['isAvailable'] !== undefined
            ? queryParams['isAvailable'] === 'true'
            : prev.isAvailable,
      }));
    }
    this.loadProducts();
  }

  onSearch(event: { name: string }) {
    this.productsParams.update((prev) => ({
      ...prev,
      name: event.name,
      page: 1,
    }));
    this.updateQueryParams();
    this.loadProducts();
  }

  onAvailabilityFiltering(event: { isAvailable: boolean | null }) {
    this.productsParams.update((prev) => ({
      ...prev,
      isAvailable: event.isAvailable,
      page: 1,
    }));
    this.updateQueryParams();
    this.loadProducts();
  }

  onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.productsParams.update((prev) => ({
      ...prev,
      page: event.pageNumber,
      pageSize: event.pageSize,
    }));
    this.updateQueryParams();
    this.loadProducts();
  }

  loadProducts() {
    this.productService.readProducts(this.productsParams()).subscribe({
      next: (result) => this.paginatedProducts.set(result),
    });
  }

  openDetailsSideBar(product: Product) {
    this.selectedProduct.set(product);
    this.isSideBarOpen.set(true);
  }

  closeDetailsSideBar() {
    this.isSideBarOpen.set(false);
  }

  openEditModal(product: Product) {
    this.selectedProduct.set(product);
    this.editModal()?.nativeElement.showModal();
  }

  closeModal() {
    this.editModal()?.nativeElement.close();
    this.loadProducts();
  }

  openCreateModal() {
    this.createModal()?.nativeElement.showModal();
  }

  closeCreateModal() {
    this.createModal()?.nativeElement.close();
    this.loadProducts();
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.productsParams(),
      },
      queryParamsHandling: 'merge',
    });
  }
}
