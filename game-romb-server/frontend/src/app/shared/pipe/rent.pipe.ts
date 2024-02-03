import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rentPipe'
})
export class RentPipe implements PipeTransform {

    transform(value: number | undefined, country: string | undefined): string | number {

        return (country === 'ukraine') ? `${String(value).slice(0, 2)}k×🎲` : `${value}`;
    }
}
