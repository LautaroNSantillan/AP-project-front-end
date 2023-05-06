import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { WebUser } from '../model/web-user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebUserService implements OnInit{
  webUserURL=environment.URL+"web-user/";

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  public webUserList(): Observable<WebUser[]>{
    return this.httpClient.get<WebUser[]>(this.webUserURL+'all-users');
  }
  public getWebUser(id: number): Observable<WebUser>{
    return this.httpClient.get<WebUser>(this.webUserURL+`get-web-user/${id}`);
  }
  public createWebUser(webuser: WebUser): Observable<any>{
    return this.httpClient.post<any>(this.webUserURL+'create-web-user', webuser);
  }
  public updateWebUser(id:number, webuser: WebUser): Observable<any>{
    return this.httpClient.patch<any>(this.webUserURL+`update-web-user/${id}`, webuser);
  }
  public getCurrentUser(): Observable<any>{
    return this.httpClient.get<any>(this.webUserURL+'current-web-user');
  }
  public getCurrentUserId(): Observable<number>{
    return this.httpClient.get<number>(this.webUserURL+'get-current-user-id');
  }
  public getIsAdmin(): Observable<boolean>{
    return this.httpClient.get<boolean>(this.webUserURL+'get-is-admin');
  }
  public getMe(): Observable<any>{
    return this.httpClient.get<any>(this.webUserURL+'get-me');
  }
}
