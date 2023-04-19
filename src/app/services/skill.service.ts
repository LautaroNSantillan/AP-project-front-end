import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  skillURL = "http://localhost:8080/skill/";

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
}
