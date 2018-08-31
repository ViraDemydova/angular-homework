import { Component, OnInit } from '@angular/core';
import { CoursesListItemService } from '../courses/services/courses-list-item.service';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../core/store/states';
import { CoursesState } from '../courses/store/states';

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
    this.getState = this.store.pipe(select(selectAuthState));
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  onAddCourse() {
    this.coursesListService.addItem(this.newItem);
  }

  public onSearchTextChanged(e: string): void {
    this.searchText = e;
  }

}
