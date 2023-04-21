import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from '../model/experience';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  expURL = environment.URL+"exp/";

  constructor(private httpClient: HttpClient) { }

  public expList(): Observable<Experience[]>{
    console.log(this.httpClient.get<Experience[]>(this.expURL + 'active-exp'))
      return this.httpClient.get<Experience[]>(this.expURL + 'active-exp');
  }

  public detail(id :number): Observable<Experience>{
    return this.httpClient.get<Experience>(this.expURL + `get-exp/${id}`);
  }
  public getExpByIdList(id :number): Observable<Experience[]>{
    return this.httpClient.get<Experience[]>(this.expURL + `active-exp-by-id/${id}`);
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
