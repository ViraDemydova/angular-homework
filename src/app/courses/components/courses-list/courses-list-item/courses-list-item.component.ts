import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { CoursesListItem } from '../../../models/courses-list-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit, OnChanges {
  @Input() public listItem: CoursesListItem;
  @Output() deleteCourse: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();
  @Output() editCourse: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();
  @Output() getbyId: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();
  @Output() id: number;
  creationDate: string;
  title: string;
  state: boolean;

  constructor(
    private router: Router) {
    //this.router.events.subscribe((event: RouterEvent) => {
     // console.log(event);
    //});
  }

  ngOnInit() {
    this.creationDate = String(this.listItem.createDate);
    this.id = this.listItem.id;
    this.state = true;
  }

  ngOnChanges() {
    console.log('ngOnChange - data is: ', this.listItem.id);
  }

  onDelete(id: CoursesListItem) {
    if (confirm('Are you sure to delete this course: ' + this.listItem.title + ' ' + this.listItem.id + '?' )) {
      this.deleteCourse.emit(id);
    }
  }

  goToEditPage(event) {
    this.router.navigateByUrl('/edit-page/' + this.listItem.id + '/' + this.state);
  }
}
