import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-image-with-preview',
  imports: [],
  templateUrl: './image-with-preview.html',
  styleUrl: './image-with-preview.css',
})
export class ImageWithPreview {
  protected selectedFile = signal<File | null>(null);
  protected imagePreview = signal<string | null>(null);
  fileChange = output<File | null>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.updateSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.updateSelectedFile(null);
    this.imagePreview.set(null);

    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  updateSelectedFile(file: File | null) {
    this.selectedFile.set(file);
    this.fileChange.emit(file);
  }
}
