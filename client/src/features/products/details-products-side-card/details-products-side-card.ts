import { Component, input, output } from '@angular/core';
import { Product } from '../../../types/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details-products-side-card',
  imports: [CurrencyPipe],
  templateUrl: './details-products-side-card.html',
  styleUrl: './details-products-side-card.css',
})
export class DetailsProductsSideCard {
  product = input<Product | null>(null);
  close = output<void>();
}
