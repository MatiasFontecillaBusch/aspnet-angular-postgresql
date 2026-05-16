import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockFormat',
  standalone: true,
})
export class StockFormatPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value <= 0) {
      return 'Agotado';
    }

    return `${new Intl.NumberFormat('es-CL').format(value)} unds.`;
  }
}
