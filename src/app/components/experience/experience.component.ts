
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private expService: ExperienceService, private tokenService:  TokenService, private webUserService: WebUserService, private router: Router){}

  ngOnInit() {
    const currentRoute = this.router.url;
    if(currentRoute=="/dashboard/profile")
    {
      this.loadExperience();
    }else{
      this.webUserService.getMe().subscribe({
        next:data=>{
          this.experience=data.experience;
          console.log("my exp:"+this.experience)
        }
      })
    }

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

