import { Component, effect, inject, input, output, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../types/product';

@Component({
  selector: 'app-edit-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product-form.html',
  styleUrl: './edit-product-form.css',
})
export class EditProductForm {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);

  protected dataForm: FormGroup;
  protected validationErrors = signal<string[]>([]);

  id = input<number>(0);
  product = input<Product | null>();
  close = output<void>();

  constructor() {
    this.dataForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });

    effect(() => {
      const p = this.product();
      if (p) {
        this.dataForm.patchValue({
          name: p.name,
          price: p.price,
        });
      }
    });
  }

  editProduct() {
    if (!this.dataForm.valid) {
      return;
    }

    const updateProduct = {
      ...this.dataForm.value,
    };

    this.productService.updateProduct(this.product()?.id ?? 0, updateProduct).subscribe({
      next: (res) => {
        this.close.emit();
      },
      error: (error) => {
        this.validationErrors.set(error);
      },
    });
  }

  onCancel() {
    this.close.emit();
  }
}
