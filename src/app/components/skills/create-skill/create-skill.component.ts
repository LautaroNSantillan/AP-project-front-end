import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { WebUser } from 'src/app/model/web-user';
import { SkillService } from 'src/app/services/skill.service';
import { SwalService } from 'src/app/services/swal.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss']
})
export class CreateSkillComponent {
  skillName: string;
  skillPer:number;
  webUser: WebUser;
  newSkillForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private skillService: SkillService, 
    private router: Router, 
    private webUserService: WebUserService, 
    public imageService: UploadImageService,
    private swal: SwalService){
    this.newSkillForm = this.fb.group({
      skillName: ['', Validators.required],
      skillPercentage: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.webUserService.getCurrentUser().subscribe({
      next:data=>{
        this.webUser=data;
      }
    })
  }

  onCreate(): void{
    const skill = new Skill(this.skillName, this.skillPer, this.imageService.imgURL);

    this.skillService.save(skill).subscribe({
      next:res=>{
        this.swal.successAlert("Success!", res.msg);
      },
      error:err=>{
        this.swal.errorAlert("Error!", err.error.msg);
      }
    });
    this.imageService.imgURL="";
  }

  uploadImage($event: any){
    const name = "user" + this.webUser.name+ "skillimg"+ this.skillName;
    this.imageService.uploadImage($event, name);
  }

}
