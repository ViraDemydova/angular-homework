import { Component, OnInit, Input } from '@angular/core';
import { CoursesListItemService } from '../courses/services/courses-list-item.service';
import { CoursesListItem } from '../courses/models/courses-list-item.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  @Input() public listItem: CoursesListItem;
  @Input() pageCurrent = 'Edit Page';
  id: number;
  //start = location.href.indexOf('edit-page/');

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private coursesListService: CoursesListItemService) {}

  ngOnInit() {
    //this.id = Number(location.href.substring(this.start + 10));
    //this.listItem = this.coursesListService.getCourseById(this.id);
    //console.log('Getting object by ID, result as: ', this.coursesListService.getCourseById(this.id));
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.listItem = this.coursesListService.getCourseById(this.id);
  }

  onSave(item: CoursesListItem) {
    this.coursesListService.editItem(item);
    this.router.navigate(['landing-page']);
  }
}
