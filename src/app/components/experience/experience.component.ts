
import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/model/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenService } from 'src/app/services/token.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit{
  experience: Experience[] = [];
  isLogged=false;

  constructor(private expService: ExperienceService, private tokenService:  TokenService, private webUserService: WebUserService){}

  ngOnInit() {
    this.loadExperience();
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }
    else{
      this.isLogged=false;
    }
  }

  loadExperience():void{
     this.webUserService.getCurrentUserId().subscribe(userId => {
      console.log(userId);
      this.expService.getExpByIdList(userId).subscribe(res => {
        console.log(res);
        this.experience = res;
      });
    });
  }
  disable(id?: number){
    if(id!=undefined){
      this.expService.disable(id).subscribe(data => {
        this.loadExperience();
      },err=> {
        console.log(err)
        alert(err.error.msg)
      })
    }
  }
}

