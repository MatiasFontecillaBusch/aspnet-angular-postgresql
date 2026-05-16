import { Component, effect, inject, input, output, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product-form.html',
  styleUrl: './create-product-form.css',
})
export class CreateProductForm {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);

  protected dataForm: FormGroup;
  protected validationErrors = signal<string[]>([]);

  close = output<void>();

  constructor() {
    this.dataForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  createProduct() {
    if (!this.dataForm.valid) {
      return;
    }

    const createProductDto = {
      ...this.dataForm.value,
    };

    this.productService.createProduct(createProductDto).subscribe({
      next: (res) => {
        console.log({ res });
        this.close.emit();
      },
      error: (error) => {
        console.log({ error });
        this.validationErrors.set(error);
      },
    });
  }

  onCancel() {
    console.log('CANCEL');
    this.close.emit();
  }
}
