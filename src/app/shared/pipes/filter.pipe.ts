import { Pipe, PipeTransform, Injectable } from '@angular/core';
import {CoursesListItem} from '../../courses/models/courses-list-item.model';

@Pipe({
  name: 'filter',
  pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(
    array: Array<CoursesListItem>,
    searchText: string
  ): Array<CoursesListItem> {
    // если не задали строку фильтрации, то возвращаем все записи
    if (!searchText) {
      return array;
    }

    return array.filter(elem =>
      elem.title.toUpperCase().includes(searchText.toUpperCase())
    );
  }
}
