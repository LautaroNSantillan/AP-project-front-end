import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from '../model/new-user';
import { Observable } from 'rxjs';
import { LoginUser } from '../model/login-user';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

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
  public isLogged(): boolean{
    if(this.tokenService.getToken()){
      return true;
    }
    else{
      return false;
    }
  }
}
