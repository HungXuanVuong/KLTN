import { Pipe, PipeTransform } from '@angular/core';

import { Router } from '@angular/router';

@Pipe({
  name: 'position'
})

export class FilterPositionPipe implements PipeTransform {

  transform(items: any[], searchText: string, mess: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      console.log(it.position.toLowerCase().includes(searchText));
      return it.position.toLowerCase().includes(searchText);
    });
  }
}


