import { Component, Input } from '@angular/core';
import { CourseModel } from '../courses/models/courses-list-item.model';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {
  newItem: CourseModel = new CourseModel(null, '', null, null, '');
  @Input() pageCurrent = 'New Page';

  constructor() {}

  onCreateCourse() {
    // делаем копию
    const courseToSave = { ...this.newItem };

    // донастраиваем то, что пользователь не вводит из формы
    courseToSave.id = 1; // сгенерит сервер
    courseToSave.createDate = new Date();

    // обнуляем newItem
    this.newItem = new CourseModel(null, '', null, null, '');
    console.log('Создали курс: ', courseToSave);
  }

  onCancel() {
    console.log('onCancel');
   }

}
