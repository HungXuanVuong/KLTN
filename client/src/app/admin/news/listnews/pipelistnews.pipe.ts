import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})

export class FilterRolePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {

       return it.employee._id.includes(searchText);
    });
  }
}
