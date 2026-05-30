import { Component, inject, output, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageWithPreview } from '../../../shared/image-with-preview/image-with-preview';

@Component({
  selector: 'app-create-product-form',
  imports: [ReactiveFormsModule, ImageWithPreview],
  templateUrl: './create-product-form.html',
  styleUrl: './create-product-form.css',
})
export class CreateProductForm {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);

  protected dataForm: FormGroup;
  protected validationErrors = signal<string[]>([]);
  protected selectedFile = signal<File | null>(null);

  close = output<void>();

  constructor() {
    this.dataForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
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
        this.close.emit();
      },
      error: (error) => {
        this.validationErrors.set(error);
      },
    });
  }

  onImageChanged(file: File | null) {
    this.selectedFile.set(file);
  }

  onCancel() {
    this.close.emit();
  }
}
