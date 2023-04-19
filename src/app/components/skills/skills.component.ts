import { Component } from '@angular/core';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills: Skill[] = [];
  isLogged: boolean = false;

  constructor(private skillService: SkillService, private tokenService: TokenService){}

  ngOnInit(): void {
    this.loadSkills();
    
  }

  loadSkills(): void {
    this.skillService.skillList().subscribe({
      next:res=>{
        console.log(res);
        this.skills=res;
        if(this.tokenService.getToken()){
          this.isLogged=true;
        }
        else{
          this.isLogged=false;
        }
      }
    })
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
