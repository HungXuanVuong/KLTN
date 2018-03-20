import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterJobPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      // if(it.tenNV.toLowerCase().includes(searchText)){
        return it.title.toLowerCase().includes(searchText);
      // }else{
      //   console.log('not found');
      // }
      
    });
  }
}


