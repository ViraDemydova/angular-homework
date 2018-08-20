import { Injectable } from '@angular/core';
import { CoursesListItem } from '../models/courses-list-item.model';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../../loader/services/loader.service';

const BASE_URL = 'http://localhost:3000/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesListItemService {

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) {}

 addItem(item: CoursesListItem): Observable<CoursesListItem> {
    return this.http.post<CoursesListItem>(`${BASE_URL}`, {...item});
  }

  deleteItem(id: string): Observable<number> {
    return this.http.delete<CoursesListItem>(`${BASE_URL}/${id}`);
  }

  editItem(item: CoursesListItem): Observable<CoursesListItem> {
    return this.http.put<CoursesListItem>(`${BASE_URL}/${item.id}`, {...item});
  }

  getCourseListItems(_page: string, _start: string, _end: string, _sort: string ): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(`${BASE_URL}`, {params: { _page, _start, _end, _sort}});
  }

  getCourseById(id: string): Observable<CoursesListItem> {
    return this.http.get<CoursesListItem>(`${BASE_URL}/${id}`);
  }

  searchTextWithParams(q: string, _page: string, _start: string, _end: string, _sort: string): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(`${BASE_URL}`, {params: {q, _page, _start, _end, _sort}});
  }
}

