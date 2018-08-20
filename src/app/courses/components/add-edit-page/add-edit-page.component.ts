// TODO: will replace edit-page and add-page
import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CourseModel, CoursesListItem } from '../../models/courses-list-item.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AddCourseState, courseAddSelector } from './store/add-course/states';
import { AddCourseSuccess } from './store/add-course/actions/course.actions';
import { EditCourseSuccess } from './store/edit-course/actions/course.actions';
import { courseEditSelector } from './store/edit-course/states';

@Component({
  selector: 'app-add-edit-page',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css']
})
export class AddEditPageComponent implements OnInit, OnDestroy {
  private usersEditSubscription: Subscription;
  private usersIdSubscription: Subscription;
  // Edit Course
  public listItem: CoursesListItem;
  public id: number;
  public indificator: string;
  public createDate: any;
  state: string;
  newItem: CourseModel;
  pageCurrent = 'New Page';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CoursesListItemService,
    private storeCourse: Store<AddCourseState>) {}

  ngOnInit() {
    // Add Course
    this.newItem = new CourseModel(null, null, null, null, '');
    this.indificator = this.route.snapshot.paramMap.get('id');
    this.state = this.route.snapshot.paramMap.get('state');
    if (this.indificator) {
      this.usersIdSubscription = this.courseService.getCourseById(this.indificator).subscribe((res: CoursesListItem) => {
          this.listItem = res;
        },
        (error: HttpErrorResponse) => console.log(error)
      );
    }
  }

  onSave() {
    // У компонента не должно быть взаимодействия с courseServices.
    // Он должен взаимодействовать только со стором: либо читать с него данные
    // с помощью селектора, либо диспатчить событие.
    // В идеале код ниже должен выглядеть так
    // if (this.usersIdSubscription) {
    //   this.storeCourse.dispatch(new AddCourse(this.listItem));
    // }
    // else {
    //   this.storeCourse.dispatch(new EditCourse(this.listItem));
    // }
    // и все.
    // Обращение к сервису должно происходить в эффектах.
    // Но по требованию к домашке не сказано использовать эффекты.

    if (this.usersIdSubscription) {
      this.courseService.editItem(this.listItem).subscribe((res: CoursesListItem) => {
          this.storeCourse.dispatch(new EditCourseSuccess(res));
          // вернулись к списку курсов
          this.router.navigate(['landing-page']);
        });
      this.storeCourse.select(courseEditSelector).subscribe(res => {
        this.router.navigate(['landing-page']);
      });
    } else {
      // донастраиваем то, что пользователь не вводит из формы
      this.newItem.createDate = new Date();
      this.courseService.addItem(this.newItem).subscribe((res: CoursesListItem) => {
        this.storeCourse.dispatch(new AddCourseSuccess(res));
      });
      this.storeCourse.select(courseAddSelector).subscribe(res => {
        this.router.navigate(['landing-page']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['landing-page']);
  }

  ngOnDestroy(): void {
    if (this.usersEditSubscription) {
      this.usersEditSubscription.unsubscribe();
    }
  }
}

