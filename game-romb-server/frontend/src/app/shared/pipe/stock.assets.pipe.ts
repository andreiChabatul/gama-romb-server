import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockAssets'
})
export class StockAssetsPipe implements PipeTransform {

  transform(value: string | undefined): string {
    let defaultStock = 'stock'

    switch (value) {
      case 'japan':
        defaultStock = 'stamp'
        break;
      case 'ukraine':
        defaultStock = 'bag'
        break;
      default:
        break;
    }

    return (defaultStock)
      ? `assets/${defaultStock}.svg`
      : `assets/default.svg`
  }
}
