import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'derp' })
export class DerpPipe {
  transform (value, args) {
    return Array.from(value);
  }
}