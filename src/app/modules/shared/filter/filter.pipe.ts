import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(org: any, term: any): any {
    // check if search term is undefined
    if (term === undefined) {
      return org;
    } else {
    // check if search term exists
    return org.filter((each: any) => {
      return each.orgName.toLowerCase().includes(term.toLowerCase());
    });
    }
  }

}
