import { Component, OnInit } from '@angular/core';
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

  constructor(private educationServ: EducationService, private tokenServ: TokenService, private auth: AuthService, private webUserService: WebUserService){}

  ngOnInit(): void {
    this.loadEducation();
    this.isLogged=this.auth.isLogged();
  }

  loadEducation(): void{
    this.webUserService.getCurrentUserId().subscribe(userId => {
      this.educationServ.getActiveEduById(userId).subscribe(res => {
        console.log(res);
        this.education = res;
      });
    });
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
