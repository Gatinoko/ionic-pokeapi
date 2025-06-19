import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphenToSpace',
})
export class HyphenToSpacePipe implements PipeTransform {
  transform(value: string | null): string {
    if (value === null) {
      return ''; // Handle null input
    }
    return value.replace(/-/g, ' ');
  }
}
