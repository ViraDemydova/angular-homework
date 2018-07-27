import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { CoursesListItemService } from '../courses/services/courses-list-item.service';
import {CourseModel, CoursesListItem} from '../courses/models/courses-list-item.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  @Input() public listItem: CoursesListItem;
  id: number;

  constructor(private router: Router,
              private coursesListService: CoursesListItemService) {}

  ngOnInit() {
    this.listItem = this.coursesListService.getCourseById(5);
    console.log('Getting object by ID, result as: ', this.coursesListService.getCourseById(this.listItem.id));
  }

  onSave(item: CoursesListItem) {
    this.coursesListService.editItem(item);
    console.log('Cours with id: ', this.listItem.id, ' was edited');
    this.router.navigate(['landing-page']);
  }
}
