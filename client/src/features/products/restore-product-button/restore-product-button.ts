import { Component, inject, input, output } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';

@Component({
  selector: 'app-restore-product-button',
  imports: [],
  templateUrl: './restore-product-button.html',
  styleUrl: './restore-product-button.css',
})
export class RestoreProductButton {
  private productService = inject(ProductService);
  id = input<number>(0);
  saved = output<void>();

  restoreProduct() {
    this.productService.restoreProduct(this.id()).subscribe({
      next: () => {
        console.log(':D');
        this.saved.emit();
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
}
