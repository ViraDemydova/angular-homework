import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { CoursesListItem } from '../../../models/courses-list-item.model';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(listItems: CoursesListItem[], args: any[]): any {
    return listItems.filter(listItem => listItem.title.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
  }
}
