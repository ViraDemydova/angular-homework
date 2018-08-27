// TODO: will replace edit-page and add-page
import {Component, Input, OnInit, OnDestroy} from '@angular/core';
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
import {FormBuilder, FormControl, FormGroup, NG_ASYNC_VALIDATORS, ValidatorFn, Validators} from '@angular/forms';
import { DateValidator } from '../../../shared/directives/validator';

@Component({
  selector: 'app-add-edit-page',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css'],
 // providers: [
   // {
     // provide: NG_ASYNC_VALIDATORS,
     // useValue: DateValidator,
     // multi: true
    //}
  //]
})

//export function  validateDate(): ValidatorFn {
  //return (c: FormControl) => {
   // const EMAIL_REGEXP = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
   // if (EMAIL_REGEXP) {
     // return null;
    //} else {
     // return {
      //  datevalidator: {
        //  valid: false
       // }
      //};
    //}
 // };
//}

export class AddEditPageComponent implements OnInit, OnDestroy {
  private usersEditSubscription: Subscription;
  private usersIdSubscription: Subscription;
  // Edit Course
  public listItem: CoursesListItem;
  public id: number;
  public indificator: string;
  state: string;
  newItem: CourseModel;
  pageCurrent = 'New Page';
  addCourseForm: FormGroup;
  submitted = false;
  @Input() formControl: FormControl;
  //selectedAuthor = this.authors[1];
  public authors: string[] = [];
  public user: string;
  private authorCreateSubscription: Subscription;

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
    this.authorCreateSubscription = this.courseService.getAuthors().subscribe((res: string[]) => {
      this.authors = res;
    });
    this.addCourseForm = this.formBuilder.group({
      title: [null, [Validators.required,  Validators.maxLength(10)]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      duration: [null, [Validators.required]],
      createDate: [ null, [Validators.required, DateValidator]]
    });

    // Add Course
    this.newItem = new CourseModel(null, null, null, null, null, null);
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

  onChange(author) {
    alert(author.name);
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

