import { Component, OnInit } from '@angular/core';
import { CoursesListItemService } from '../courses/services/courses-list-item.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../core/store/states';
import { CoursesState } from '../courses/store/states';
import { stateEnum } from '../courses/components/courses-page/enum';
import { LoadSuccess } from '../courses/store/actions/course.actions';
import { CoursesListItem } from '../courses/models/courses-list-item.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  searchText: string;
  newItem: any;
  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;

  constructor(
              private coursesListService: CoursesListItemService,
              private store: Store<AppState>,
              private storeCourse: Store<CoursesState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', this.isAuthenticated);
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }
//init(): void {
  // this.showLoader();
  //this.usersCreateSubscription = this.coursesListService.getCourseListItems(this.pageData.startPage.toString(), this.pageData.countToStart.toString(), this.pageData.countToLoad.toString(), this.createDate).subscribe((res: CoursesListItem[]) => {
  //  this.listItems = res;
  //  this.hideLoader();
  // });
  // this.usersCreateSubscription.add(this.sub);
  //}

  onAddCourse() {
    this.coursesListService.addItem(this.newItem);
  }

  public onSearchTextChanged(e: string): void {
    this.searchText = e;
  }

}
