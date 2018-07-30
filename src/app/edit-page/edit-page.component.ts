// TODO: Подумай над тем, как использовать один и тот же компонент для создания нового курса и редактирования
import { Component, OnInit, Input } from '@angular/core';
import { CoursesListItemService } from '../courses/services/courses-list-item.service';
import { CoursesListItem } from '../courses/models/courses-list-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  @Input() public listItem: CoursesListItem;
  // TODO: тут было бы удобнее показывать название курса,
  // чтобы понимать какой курс редактируется.
  // Еще я бы эти компоненты занес в папку cources/components/
  // и не создавал бы для них отдельного модуля. Это все работа с одной и той же моделью - курс.
  @Input() pageCurrent = 'Edit Page';
  id: number;
  start = location.href.indexOf('edit-page/');

  constructor(
    private router: Router,
    private coursesListService: CoursesListItemService
  ) {}

  ngOnInit() {
    // TODO: это не правильный подход.
    // Для работы с параметрами используется ActivatedRoute service.
    // У него есть специальное свойство ParamMap
    this.id = Number(location.href.substring(this.start + 10));
    this.listItem = this.coursesListService.getCourseById(this.id);
    console.log(
      'Getting object by ID, result as: ',
      this.coursesListService.getCourseById(this.id)
    );
  }

  onSave(item: CoursesListItem) {
    this.coursesListService.editItem(item);
    this.router.navigate(['landing-page']);
  }
}
