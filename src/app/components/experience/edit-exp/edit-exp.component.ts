import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from 'src/app/model/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { SwalService } from 'src/app/services/swal.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-edit-exp',
  templateUrl: './edit-exp.component.html',
  styleUrls: ['./edit-exp.component.scss']
})
export class EditExpComponent implements OnInit {
  imgURL: string;
  newimgURL: string;
  editExpForm: FormGroup;
  expToMod: Experience = null;

  constructor(
    public imageService: UploadImageService,
    private experienceServ: ExperienceService, 
    private activatedRouter: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    private swal: SwalService,
    @Inject(MAT_DIALOG_DATA) public data:{ expId: number }){
    this.editExpForm=this.fb.group({
      expName: ['', Validators.required],
      expDescription: ['', Validators.required],
    })
  }

  ngOnInit() {
    const id = this.data.expId;
    this.experienceServ.detail(id).subscribe(res=>{
      this.expToMod = res;
    },err=>{
      console.log(err)
      alert("ERROR "+ err.error.msg)
    })
  }

  onUpdate(): void{
    this.expToMod.imgURL=this.imgURL;

    const id = this.data.expId;
    this.experienceServ.update(id, this.expToMod).subscribe(res=>{
      this.swal.successAlert("Success!", res.msg);
    },err=>{
     this.swal.errorAlert("Error!", err.error.msg);
    });
    this.expToMod.imgURL="";
    this.imageService.imgURL="";
  }
  uploadImage($event: any){
    const id = this.data.expId;
    const name = "edupic#"+id;
    this.imageService.uploadImage($event, name)
    .then(url => {
      this.imgURL=url;
      this.newimgURL = url;
      console.log(this.imgURL);
    })
    .catch(err => {
      console.error(err);
    });
}
}
