import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'avatarImage'
})
export class AvatarImagePipe implements PipeTransform {

    transform(value: string | undefined): string {
        return 'data:image/jpg;base64,' + value;
    }
}
