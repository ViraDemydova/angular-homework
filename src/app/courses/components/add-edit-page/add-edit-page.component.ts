// TODO: will replace edit-page and add-page
import {Component,  OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CourseModel, CoursesListItem } from '../../models/courses-list-item.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import { AddCourseState, courseAddSelector } from './store/add-course/states';
import {AddCourse, AddCourseSuccess} from './store/add-course/actions/course.actions';
import { EditCourseSuccess } from './store/edit-course/actions/course.actions';
import { courseEditSelector } from './store/edit-course/states';
import {FormBuilder,  FormGroup, Validators} from '@angular/forms';
import { DateValidator } from '../../../shared/directives/validator';
import { NumbersOnly } from '../../../shared/directives/onlyNumber';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-edit-page',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css'],
})

export class AddEditPageComponent implements OnInit, OnDestroy {
  private usersEditSubscription: Subscription;
  private usersIdSubscription: Subscription;
  // Edit Course
  public listItem: CoursesListItem;
  public id: number;
  public authors: string[] = [];
  public selectedAuthors: string[] = [];
  public indificator: string;
  state: string;
  newItem: CourseModel;
  pageCurrent = 'New Page';
  addCourseForm: FormGroup;
  editCourseForm: FormGroup;
  submitted = false;
  // input tags
  selectable = true;
  removable = true;
  addOnBlur = true;
  public user: string;
  private authorCreateSubscription: Subscription;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

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

    // Add Course
    this.newItem = new CourseModel(null, '', null, null, null, null);
    if (!this.indificator) {
      this.initAddForm();
    }

    this.indificator = this.route.snapshot.paramMap.get('id');
    this.state = this.route.snapshot.paramMap.get('state');
    if (this.indificator) {
      this.usersIdSubscription = this.courseService.getCourseById(this.indificator).subscribe((res: CoursesListItem) => {
          this.listItem = res;
          // Edit Course
          this.initEditForm();
          this.selectedAuthors = this.listItem.authors;
        },
        (error: HttpErrorResponse) => console.log(error)
      );
    }
  }

  initEditForm() {
    // Edit Course form
    this.editCourseForm = this.formBuilder.group({
      title: [this.listItem.title, [Validators.required,  Validators.maxLength(30)]],
      description: [this.listItem.description, [Validators.required, Validators.maxLength(500)]],
      duration: [this.listItem.duration, [Validators.required, NumbersOnly]],
      createDate: [this.listItem.createDate, [Validators.required, DateValidator]],
      authors: [this.listItem.authors, [Validators.required]]
    });
  }

  initAddForm() {
    // Edit Course form
    this.addCourseForm = this.formBuilder.group({
      title: [this.newItem.title, [Validators.required,  Validators.maxLength(10)]],
      description: [this.newItem.description, [Validators.required, Validators.maxLength(500)]],
      duration: [this.newItem.duration, [Validators.required, NumbersOnly]],
      createDate: [this.newItem.createDate, [Validators.required, DateValidator]],
      authors: [this.newItem.authors, [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addCourseForm.controls; }
  get g() { return this.editCourseForm.controls; }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our item
    if ((value || '').trim()) {
      this.selectedAuthors.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(data: any): void {
    if (this.selectedAuthors.indexOf(data) >= 0) {
      this.selectedAuthors.splice(this.selectedAuthors.indexOf(data), 1);
    }
  }

  public addSelect(event) {
    const option = event.option;
    const value = option.value;
    if (value || '') {
      this.selectedAuthors.push(value);
      console.log(this.selectedAuthors);
    }
  }

  onSave() {
    this.submitted = true;

      // stop here if form is invalid
    if (this.state) {
      if (this.editCourseForm.invalid) {
        return;
      }
    }

    if (!this.state) {
      if (this.addCourseForm.invalid) {
        return;
      }
    }

    // Edit Course
    if (this.usersIdSubscription) {
      //TODO: move to effect
      this.courseService.editItem(this.listItem).subscribe((res: CoursesListItem) => {
          this.storeCourse.dispatch(new EditCourseSuccess(res));
        });
      this.storeCourse.pipe(select(courseEditSelector)).subscribe(res => {
        this.router.navigate(['landing-page']);
      });
    } else {
      //  Add Course
      this.newItem.createDate = new Date();
      this.newItem.title = this.addCourseForm.get('title').value;
      this.newItem.description = this.addCourseForm.get('description').value;
      this.newItem.duration = this.addCourseForm.get('duration').value;
      this.newItem.authors = this.selectedAuthors;
      //TODO: move to effect
      this.storeCourse.dispatch(new AddCourse(this.newItem));
      this.storeCourse.pipe(select(courseAddSelector));
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

