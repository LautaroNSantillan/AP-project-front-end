import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { MockUser } from '../model/mock-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL=environment.URL+"mock/";

  constructor(private http: HttpClient) { }

  public getUser(): Observable<user> {
    return this.http.get<user>(this.URL+ 'user/1');
  }

  public allUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.URL+'all-users');
  }

  public createUser(mock: MockUser): Observable<any> {
    return this.http.post<any>(this.URL+ 'create-mock-user', mock);
  }

  public editUser(mock: MockUser): Observable<any>{
    return this.http.post<any>(this.URL+'edit-mock-user', mock);
  }
  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.URL+ `delete-mock-user/${id}`);
  }
}
