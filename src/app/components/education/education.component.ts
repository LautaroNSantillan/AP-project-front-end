import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  education: Education[]=[];
  isLogged=false;

  constructor(private educationServ: EducationService, private tokenServ: TokenService){}

  ngOnInit(): void {
    this.loadEducation();
    if(this.tokenServ.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }

  loadEducation(): void{
    this.educationServ.eduList().subscribe(res=>{
      console.log(res);
      this.education=res;
    })
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
