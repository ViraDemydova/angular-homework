import { Injectable  } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntityItem } from '../../users/models/user-entity-item.model';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  isUserAuthenticated: boolean;
  user: UserEntityItem;

  constructor(
    private http: HttpClient
  ) {}


  getToken(): string {
    return localStorage.getItem('tokenKey');
  }

  //login(login: string, password: string) {
    //return this.http.get<any>('http://localhost:3000/users')
     // .pipe(map(user => {
        // login successful if there's a jwt token in the response
      //  if (user && this.getAuthToken()) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
       //   localStorage.setItem('currentUser', JSON.stringify(user));
      //  }
        // TODO: Такой код плохо читается
      //  return user && (this.isUserAuthenticated = true);
      //}));
  //}

  login(login: string, password: string): Observable<any> {
    const url = `${BASE_URL}/users`;
    return this.http.post<UserEntityItem>(url, {login, password});
  }

  signIn(login: string, password: string): Observable<UserEntityItem> {
    const url = `${BASE_URL}/register`;
    return this.http.post<UserEntityItem>(url, {login, password});
  }

  //getAuthToken(): Observable<boolean> {
   // const token = 'app_token';
    // http://localhost:3000/users?tokenKey=app_token
 //   const url = `${BASE_URL}` + '?tokenKey=' + token;
  //  return this.http.get(url)
    //  .pipe(map((res: boolean) => {
     //   return res;
    //  }));
 // }

  logout() {
    localStorage.removeItem('currentUser');
    this.isUserAuthenticated = false;
  }

  getUserInfo(id: string)  {
    return this.http.get<string>(`${BASE_URL}/${id}`);
  }


  retrieveLocalStorage() {
    const storedToken = localStorage.getItem('currentUser');
    if (!storedToken) {
      throw new Error('no token found');
    }
    return storedToken;
  }


  isAuthenticated(): boolean {
    if (this.isUserAuthenticated) {
      console.log('user is Authenticated', this.isUserAuthenticated);
      return true;
    } else {
      console.log('user is UNAuthenticated, failed to initialize!!!!', this.isUserAuthenticated);
      return false;
    }
  }

  checkCurrentUser(): Observable<any> {
    const id = 1;
    const url = `${BASE_URL}` + '/' + id;
    return this.http.get(url)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getCurrentUser() {
   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }

}
