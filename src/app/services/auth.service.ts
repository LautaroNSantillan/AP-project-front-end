import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from '../model/new-user';
import { Observable } from 'rxjs';
import { LoginUser } from '../model/login-user';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.URL+"auth/";

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  public register(newUser: NewUser): Observable<any> {
    return this.httpClient.post(this.authURL + 'register', newUser);
  }
  public login(loginUser: LoginUser): Observable<any>{
    return this.httpClient.post(this.authURL + 'login', loginUser);
  }
  isLogged(): boolean {
    const token = this.tokenService.getToken();
    console.log('token:', token);
    if (token) {
      const decodedToken = jwt_decode(token) as { exp: number };
      console.log('decodedToken.exp:', decodedToken.exp);
      const currentTime = Math.floor(Date.now() / 1000);
      console.log('currentTime:', currentTime);
      if (decodedToken.exp < currentTime) {
        console.log('token is expired');
        return false; // Token is expired
      }
      console.log('token is valid');
      return true; // Token is valid
    }
    console.log('no token found');
    return false; // No token found
  }
}
