import { Component } from '@angular/core';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills: Skill[] = [];
  isLogged: boolean = false;

  constructor(private skillService: SkillService, private tokenService: TokenService, private webUserService: WebUserService){}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.webUserService.getCurrentUserId().subscribe(userId => {
      this.skillService.getSkillByIdList(userId).subscribe(res => {
        console.log(res);
        this.skills = res;
      });
    });
    if(this.tokenService.getToken()){
          this.isLogged=true;
        }
        else{
          this.isLogged=false;
        }
  }

  disable(id :number): void{
    if(id!=undefined){
      this.skillService.disable(id).subscribe({
        next: res=>this.loadSkills(),
        error: err=> console.log(err)
      })
    }
  }

}
