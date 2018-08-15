import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {CoursesListItemService} from '../courses/services/courses-list-item.service';
import {Store} from "@ngrx/store";
import {AppState, selectAuthState} from "../store/states";
import {Observable} from "rxjs/Rx";

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

  constructor(private serviceAuth: AuthService,
              private coursesListService: CoursesListItemService,
              private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  IsAuth() {
    console.log('IsAuthenticated from landing page:', this.serviceAuth.isAuthenticated());
    return this.serviceAuth.isAuthenticated();
  }

  onAddCourse() {
    this.coursesListService.addItem(this.newItem);
  }

  public onSearchTextChanged(e: string): void {
    this.searchText = e;
  }

}
