import { Pipe, PipeTransform } from '@angular/core';

import { Router } from '@angular/router';

@Pipe({
  name: 'place'
})

export class FilterPlacePipe implements PipeTransform {

  transform(items: any[], searchText: string, mess: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
        return it.place.toLowerCase().includes(searchText);  
    });
  }
}


