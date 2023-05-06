import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { WebUser } from 'src/app/model/web-user';
import { SkillService } from 'src/app/services/skill.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss']
})
export class CreateSkillComponent {
  webUser: WebUser;
  newSkillForm: FormGroup;

  constructor(private fb: FormBuilder, private skillService: SkillService, private router: Router, private webUserService: WebUserService, public imageService: UploadImageService){
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
    const skill = new Skill(this.newSkillForm.value.skillName, this.newSkillForm.value.skillPercentage, this.imageService.imgURL);
    console.log(skill);

    this.skillService.save(skill).subscribe({
      next:res=>{
        console.log(res);
        alert(res.msg);
        this.router.navigate(['dashboard']);
      },
      error:err=>{
        console.log(err);
        alert(err.error.msg)
      }
    })
  }

  uploadImage($event: any){
    const name = "user" + this.webUser.name+ "skillimg"+ this.newSkillForm.value.skillName;
    this.imageService.uploadImage($event, name);
  }

}
