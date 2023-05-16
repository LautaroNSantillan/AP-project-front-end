import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { SwalService } from 'src/app/services/swal.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent implements OnInit{
  skillToMod: Skill = null;
  editSkillForm: FormGroup;
  skillName: string;
  skillPer:string;
  imgURL:string;
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private skillService: SkillService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:{ skillId: number },
    public imageService: UploadImageService,
    private swal: SwalService){
    this.editSkillForm=this.fb.group({
      skillName: ['', Validators.required],
      skillPercentage: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const id  = this.data.skillId;
    
    this.skillService.getSkill(id).subscribe({
      next: res=>{
        this.skillToMod=res;
      },
      error: err => {
        console.log(err);
        alert(err.error.msg);
      }
    })
  }

  onUpdate(): void {
    const id  = this.data.skillId;

    this.skillToMod.imgURL= this.imgURL;

    console.log(this.skillToMod.skillName, this.skillToMod.percentage,);

    this.skillService.update(id, this.skillToMod).subscribe({
    next: res=>{
      this.swal.successAlert('Success!', res.msg);
    },
    error: err=>{
      this.swal.errorAlert('Error!', err.error.msg);
    }
    });
    this.skillToMod.imgURL="";
    this.imageService.imgURL="";
  }

  uploadImage($event: any){
    const id = this.data.skillId;
    const name = "edupic#"+id;
    this.imageService.uploadImage($event, name)
    .then(url => {
      this.imgURL=url;
    })
    .catch(err => {
      console.error(err);
    });
}
}
