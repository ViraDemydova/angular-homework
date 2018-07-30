import { Component, Input } from '@angular/core';
import { CourseModel } from '../courses/models/courses-list-item.model';
import { CoursesListItemService } from '../courses/services/courses-list-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {
  newItem: CourseModel = new CourseModel(null, '', null, null, '');
  @Input() pageCurrent = 'New Page';

  constructor(private courseService: CoursesListItemService, private router: Router) {}

  onCreateCourse() {
    // делаем копию
    const courseToSave = { ...this.newItem };

    // донастраиваем то, что пользователь не вводит из формы
    courseToSave.id = 100; // сгенерит сервер
    courseToSave.createDate = new Date();

    // обнуляем newItem
    this.newItem = new CourseModel(null, '', null, null, '');
    console.log('Создали курс: ', courseToSave);
    // обновили страницу с курсами
    this.courseService.addItem(courseToSave);
    this.router.navigate(['landing-page']);
  }

  onCancel() {
    // TODO: почему бы тут не задействовать роутер и не реализовать возврат на список курсов,
    // если пользователь отказался от создания курса.
    console.log('onCancel');
   }

}
