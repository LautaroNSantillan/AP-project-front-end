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

    if (token) {
      const decodedToken = jwt_decode(token) as { exp: number };

      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {

        return false; // Token is expired
      }

      return true; // Token is valid
    }

    return false; // No token found
  }
}
