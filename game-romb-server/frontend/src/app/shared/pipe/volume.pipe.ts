import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'volumeImage'
})
export class VolumeImagePipe implements PipeTransform {

    transform(value: number): string {
        return `assets/menuAssets/${value === 0 ? 'volumeOff.png' : 'volumeOn.png'}`
    }
}
