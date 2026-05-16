import { Component, inject, input, output } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';

@Component({
  selector: 'app-delete-product-button',
  imports: [],
  templateUrl: './delete-product-button.html',
  styleUrl: './delete-product-button.css',
})
export class DeleteProductButton {
  private productService = inject(ProductService);
  id = input<number>(0);
  saved = output<void>();

  deleteProduct() {
    this.productService.deleteProduct(this.id()).subscribe({
      next: () => {
        this.saved.emit();
      },
      error: (error) => {
      },
    });
  }
}
