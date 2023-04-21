import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Registerdto } from '../model/registerdto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerURL= environment.URL+'web-user/';

  constructor(private http: HttpClient) { }

  public register(registerDTO: Registerdto): Observable<any> {
     return this.http.post<any>(this.registerURL+'create-web-user', registerDTO);
  }

}
