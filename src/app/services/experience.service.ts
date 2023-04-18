import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from '../model/experience';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  expURL = "http://localhost:8080/exp/";

  constructor(private httpClient: HttpClient) { }

  public expList(): Observable<Experience[]>{
    console.log(this.httpClient.get<Experience[]>(this.expURL + 'active-exp'))
      return this.httpClient.get<Experience[]>(this.expURL + 'active-exp');
  }

  public detail(id :number): Observable<Experience>{
    return this.httpClient.get<Experience>(this.expURL + `get-exp/${id}`);
  }
  public create(experience :Experience): Observable<any>{
    return this.httpClient.post<any>(this.expURL + 'create-exp', experience)
  }
  public update(id: number, experience :Experience): Observable<any>{
    return this.httpClient.patch<any>(this.expURL+ `update-exp/${id}`, experience)
  }
  public disable(id: number): Observable<any>{
    return this.httpClient.patch<any>(this.expURL+ `disable-exp/${id}`,{})
  }
}
