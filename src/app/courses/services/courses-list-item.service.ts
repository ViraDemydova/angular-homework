import { Injectable } from '@angular/core';
import {CourseModel, CoursesListItem} from '../models/courses-list-item.model';
import { courses } from './course-list-items.data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

const BASE_URL = 'http://localhost:3000/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesListItemService {
  //private courses: CoursesListItem[] = [];

  constructor(private http: HttpClient) {
    //this.courses = courses;
  }

  //public addItem(item: CoursesListItem) {
    //console.log('in service item is:', item);
    //this.courses.push(item);
  //}


  public addItem(item: object): Observable<CoursesListItem> {
    return this.http.post<CoursesListItem>(`${BASE_URL}`, {...item});
  }

  public deleteItem(id: string): Observable<CoursesListItem> {
    return this.http.delete<CoursesListItem>(`${BASE_URL}/${id}`);
  }


  // Обычно в такой метод передается item: CoursesListItem
  public editItem(item: CoursesListItem) {
    //this.courses.map((data: CoursesListItem, i) => {
     // if (data.id === item.id) {
      //  this.courses[i] = item;
     // }
    //});
  }

  public getCourseListItems(_page: string): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(`${BASE_URL}`, {params: {_page}});
  }

  public getCourseListItemsWithParams(_page, _limit: string): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(`${BASE_URL}`, {params: {_page, _limit}});
  }

  //public getCourseById(id: string): Observable<CoursesListItem[]> {
    //return this.http.get<CoursesListItem[]>(`${BASE_URL}`, {params: {id}});
  //}

  public searchTextWithParams(q: string): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(`${BASE_URL}`, {params: {q}});
  }
}

