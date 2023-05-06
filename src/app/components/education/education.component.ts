import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/model/education';
import { WebUser } from 'src/app/model/web-user';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/token.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  education: Education[]=[];
  isLogged=false;
  webUser: WebUser = null;

  constructor(private educationServ: EducationService, private tokenServ: TokenService, private auth: AuthService, private webUserService: WebUserService, private router: Router){}

  ngOnInit(): void {
    this.loadEducation();
    this.isLogged=this.auth.isLogged();
  }

  loadEducation(): void{
    const currentRoute = this.router.url;

    if(currentRoute=="/dashboard/profile"){
        this.webUserService.getCurrentUserId().subscribe(userId => {
      this.educationServ.getActiveEduById(userId).subscribe(res => {
        console.log(res);
        this.education = res;
      });
    });
    }else{
      this.webUserService.getMe().subscribe({
        next: (data) => {
          console.log(data);
          this.education=data.education;
        }
      })
    }
  
  }

  disable(id: number): void{
    if(id!=undefined){
      this.educationServ.disableEdu(id).subscribe(res=>{
        console.log(res);
        this.loadEducation();
      },err=>{
        alert(err.error.msg);
      })
    }
  }

}
