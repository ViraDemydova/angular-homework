import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { CoursesListItemService } from '../courses/services/courses-list-item.service';
import {CourseModel, CoursesListItem} from '../courses/models/courses-list-item.model';
import {ActivatedRoute, Router} from "@angular/router";
import {courses} from "../courses/services/course-list-items.data";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  @Input() public listItem: CoursesListItem;

  constructor(private router: Router,
              private coursesListService: CoursesListItemService) {}

  ngOnInit() {}

  onSave(item: CoursesListItem) {
    this.coursesListService.editItem(item);
    console.log('Cours with id: ', item.id, ' was edited');
    this.router.navigate(['landing-page']);
  }
}
