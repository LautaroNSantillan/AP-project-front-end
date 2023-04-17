import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from '../model/new-user';
import { Observable } from 'rxjs';
import { LoginUser } from '../model/login-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = "http://localhost:8080/auth/"

  constructor(private httpClient: HttpClient) { }

  public register(newUser: NewUser): Observable<any> {
    return this.httpClient.post(this.authURL + 'register', newUser);
  }
  public login(loginUser: LoginUser): Observable<any>{
    return this.httpClient.post(this.authURL + 'login', loginUser);
  }
}
