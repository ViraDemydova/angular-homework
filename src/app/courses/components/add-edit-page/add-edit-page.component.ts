// TODO: will replace edit-page and add-page
import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CourseModel, CoursesListItem } from '../../models/courses-list-item.model';

@Component({
  selector: 'app-add-edit-page',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css']
})
export class AddEditPageComponent implements OnInit {
  // Default Value
  @Input() public IsEditPageEnabled: boolean;
  @Input() public IsAddPageEnabled: boolean;
  // Edit Course
  @Input() public listItem: CoursesListItem;
  // @Input() pageCurrent = 'Edit Page';
  id: number;
  // Add Course
  newItem: CourseModel = new CourseModel(null, '', null, null, '');
  // @Input() pageCurrent = 'New Page';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CoursesListItemService) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.listItem = this.courseService.getCourseById(this.id);
  }

  onSave(item: CoursesListItem) {
    this.courseService.editItem(item);
    this.router.navigate(['landing-page']);
  }

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
    this.router.navigate(['landing-page']);
  }

}
