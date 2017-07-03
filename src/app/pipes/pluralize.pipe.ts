import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {

  transform (value: any, args?: any): any {
    if (value) {
      switch (value.toLowerCase()) {
        case 'elf':
          return 'Elves';
        case 'fungus':
          return 'Fungi';
        default:
          const lastLetter = value.charAt(value.length - 1);
          if (lastLetter === 'y') {
            value = value.replace(lastLetter, 'ies');
          } else if (lastLetter === 's') {
            value += 'es';
          } else {
            value += 's';
          }
          return value;
      }
    }
  }
}
