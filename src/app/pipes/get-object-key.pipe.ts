import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getObjectKey'
})
export class GetObjectKeyPipe implements PipeTransform {

  transform (value: any, args?: any): any {
    if (value) {}
    return value;
  }
}
