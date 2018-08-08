// TODO: will replace edit-page and add-page
import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import {
  CourseModel,
  CoursesListItem
} from '../../models/courses-list-item.model';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-page',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css']
})
export class AddEditPageComponent implements OnInit, OnDestroy {
  private usersEditSubscription: Subscription;
  // Edit Course
  // Почему тут декоратор @Input()
  // Этот компонент ничего на вход не получает.
  @Input() public listItem: CoursesListItem;
  public id: number;
  public indificator: string;
  public createDate: any;
  state: string;
  // Add Course
  // Создание этой можели необходимо только в случае обавления курса
  // Можно перенести в ngOnInit
  newItem: CourseModel = new CourseModel(null, null, null, null, '');
  // Тут не нужен декоратор
  @Input() pageCurrent = 'New Page';
  // Компонент не эмитит события, Не нужно это поле
  @Output() courseToSave;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CoursesListItemService
  ) {}

  ngOnInit() {
    this.indificator = this.route.snapshot.paramMap.get('id');
    this.state = this.route.snapshot.paramMap.get('state');
    // Этот код выполняется в двух случаях: на добавление и наредактирование.
    // Но он должен выполняться только на редактирование
    this.courseService.getCourseById(this.indificator).subscribe(
      (res: CoursesListItem) => {
        this.listItem = res;
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  // Метод onSave и onCreateCourse можно объединить.
  // Надо анализировать this.listItem.id - если есть, то редактирование,
  // если нет, то создание.
  onSave() {
    this.usersEditSubscription = this.courseService
      .editItem(this.listItem, this.indificator)
      .subscribe(
        (res: CoursesListItem) => {
          this.listItem = res;
          // вернулись к списку курсов
          this.router.navigate(['landing-page']);
        },
        (error: HttpErrorResponse) => console.log(error)
      );
  }

  onCreateCourse() {
    // донастраиваем то, что пользователь не вводит из формы
    this.newItem.createDate = new Date();
    this.courseService.addItem(this.newItem).subscribe(() => {
      // вернулись к списку курсов
      this.router.navigate(['landing-page']);
    });
  }

  onCancel() {
    this.router.navigate(['landing-page']);
  }

  public ngOnDestroy(): void {
    if (this.usersEditSubscription) {
      this.usersEditSubscription.unsubscribe();
    }
  }
}
