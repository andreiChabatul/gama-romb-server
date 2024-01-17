import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgAssets'
})
export class ImgAssetsPipe implements PipeTransform {

  transform(value: string | undefined | null, path?: string): string {
    value = path ? path + value : value;
    return (value)
      ? `assets/${value}.png`
      : `assets/default.png`
  }
}
