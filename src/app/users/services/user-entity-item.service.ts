import { Injectable } from '@angular/core';
import { UserEntityItem } from '../models/user-entity-item.model';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

const BASE_URL = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class UserEntityItemService {
  constructor( private http: HttpClient) {}

  getUsers( ): Observable<UserEntityItem[]> {
    return this.http.get<UserEntityItem[]>(`${BASE_URL}`);
  }

  getUserById(id: number): Observable<UserEntityItem> {
    return this.http.get<UserEntityItem>(`${BASE_URL}/${id}`);
  }

  checkCurrentUser(): Observable<any> {
    const id = 1;
    const url = `${BASE_URL}` + '/' + id;
    return this.http.get(url)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
