// TODO: will replace edit-page and add-page
import {Component, Input, Output, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CourseModel, CoursesListItem } from '../../models/courses-list-item.model';
import { CommunicatorService } from '../../../core/services/communicator.service';
import { Subscription } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-page',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css']
})
export class AddEditPageComponent implements OnInit, OnDestroy {
  private usersEditSubscription: Subscription;
  // Edit Course
  @Input() public listItem: CoursesListItem;
  public id: string;
  public createDate: any;
  state: string;
  // Add Course
  newItem: CourseModel = new CourseModel(null, null, null, null, '');
  @Input() pageCurrent = 'New Page';
  @Output() courseToSave;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CoursesListItemService,
    private comService: CommunicatorService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = this.route.snapshot.paramMap.get('state');
    this.courseService.getCourseById(this.id).subscribe((res: CoursesListItem) => {
        this.listItem = res;
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  onSave() {
    this.usersEditSubscription = this.courseService.editItem(this.listItem, this.id).subscribe((res: CoursesListItem) => {
        this.listItem = res;
      },
      (error: HttpErrorResponse) => console.log(error)
    );
    this.router.navigate(['landing-page']);
  }

  onCreateCourse() {
    // делаем копию
    const courseToSave = { ...this.newItem };

    // донастраиваем то, что пользователь не вводит из формы
    courseToSave.id = 100; // сгенерит сервер
    courseToSave.createDate = JSON.stringify( new Date());

    // обнуляем newItem
    this.newItem = new CourseModel(null, null, null, null, '');
    this.comService.setData(courseToSave);

    // вернулись к списку курсов
    this.router.navigate(['landing-page']);
  }

  onCancel() {
    this.router.navigate(['landing-page']);
  }

  public ngOnDestroy(): void {
    //this.usersEditSubscription.unsubscribe();
  }

}
