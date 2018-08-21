// TODO: will replace edit-page and add-page
import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CourseModel, CoursesListItem } from '../../models/courses-list-item.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import { AddCourseState, courseAddSelector } from './store/add-course/states';
import { AddCourseSuccess } from './store/add-course/actions/course.actions';
import { EditCourseSuccess } from './store/edit-course/actions/course.actions';
import { courseEditSelector } from './store/edit-course/states';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
  addCourseForm: FormGroup;
  submitted = false;

  //addCourseForm = new FormGroup ({
   // title: new FormControl(),
   // description: new FormControl(),
   // createDate: new FormControl(),
  //  duration: new FormControl(),
  //  author: new FormControl(),
 // });


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CoursesListItemService,
    private storeCourse: Store<AddCourseState>,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addCourseForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      createDate: [null, [Validators.required]],
      duration: [null, [Validators.required]]
    });
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

  // convenience getter for easy access to form fields
  get f() { return this.addCourseForm.controls; }

  onSave() {
    this.submitted = true;
      // stop here if form is invalid
    if (this.addCourseForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)');

    if (this.usersIdSubscription) {
      this.courseService.editItem(this.listItem).subscribe((res: CoursesListItem) => {
          this.storeCourse.dispatch(new EditCourseSuccess(res));
          // вернулись к списку курсов
          this.router.navigate(['landing-page']);
        });
      this.storeCourse.pipe(select(courseEditSelector)).subscribe(res => {
        this.router.navigate(['landing-page']);
      });
    } else {
      // донастраиваем то, что пользователь не вводит из формы
      this.newItem.createDate = new Date();
      //TODO: move to effect
     // this.newItem.id = 777;
      //this.newItem.createDate = new Date();
      //this.storeCourse.dispatch(new AddCourse(this.newItem));
      //this.storeCourse.pipe(select(courseAddSelector));
      this.courseService.addItem(this.newItem).subscribe((res: CoursesListItem) => {
        this.storeCourse.dispatch(new AddCourseSuccess(res));
      });
      // TODO: this.storeCourse.dispatch(new AddCourseSuccess());
      this.storeCourse.pipe(select(courseAddSelector)).subscribe(res => {
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

