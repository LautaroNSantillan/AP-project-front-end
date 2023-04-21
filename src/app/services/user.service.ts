import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL=environment.URL+"mock/";

  constructor(private http: HttpClient) { }

  public getUser(): Observable<user> {
    return this.http.get<user>(this.URL+ 'user/1');
  }
}
