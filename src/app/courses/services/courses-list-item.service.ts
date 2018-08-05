import { Injectable } from '@angular/core';
import { CoursesListItem } from '../models/courses-list-item.model';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const BASE_URL = 'http://localhost:3000/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesListItemService {

  constructor(private http: HttpClient) {}

  public addItem(item: object): Observable<CoursesListItem> {
    return this.http.post<CoursesListItem>(`${BASE_URL}`, {...item});
  }

  public deleteItem(id: string): Observable<CoursesListItem> {
    return this.http.delete<CoursesListItem>(`${BASE_URL}/${id}`);
  }

  public editItem(item: object, id: string): Observable<CoursesListItem> {
    return this.http.put<CoursesListItem>(`${BASE_URL}/${id}`, {...item});
  }

  public getCourseListItems(_page: string): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(`${BASE_URL}`, {params: {_page}});
  }

  public getCourseListItemsWithParams(_page, _limit: string): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(`${BASE_URL}`, {params: {_page, _limit}});
  }

  public getCourseById(id: string): Observable<CoursesListItem> {
    return this.http.get<CoursesListItem>(`${BASE_URL}/${id}`);
  }

  public searchTextWithParams(q: string): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(`${BASE_URL}`, {params: {q}});
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

