import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  skillURL = environment.URL+"skill/";

  constructor(private httpClient: HttpClient) { }

  public skillList(): Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(this.skillURL+'active-skill');
  }

  public getSkill(id: number): Observable<Skill> {
    return this.httpClient.get<Skill>(this.skillURL+`get-skill/${id}`);
  }

  public save(skill: Skill): Observable<any>{
    return this.httpClient.post<any>(this.skillURL+'create-skill', skill);
  }

  public update(id: number, skill: Skill): Observable<any>{
    return this.httpClient.patch<any>(this.skillURL+`update-skill/${id}`, skill)
  }

  public disable(id: number): Observable<any>{
    return this.httpClient.patch<any>(this.skillURL+`disable-skill/${id}`, {})
  }
  public getSkillByIdList(id :number): Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(this.skillURL + `active-skill-by-id/${id}`);
  }
}
