import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Experience } from 'src/app/model/experience';
import { WebUser } from 'src/app/model/web-user';
import { ExperienceService } from 'src/app/services/experience.service';
import { SwalService } from 'src/app/services/swal.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-create-exp',
  templateUrl: './create-exp.component.html',
  styleUrls: ['./create-exp.component.scss']
})
export class CreateExpComponent implements OnInit {
  webUser: WebUser;
  newExpForm: FormGroup;
  newExpName: string="";
  newExpDescription: string="";
  imgURL: string;

  constructor(private experienceServ: ExperienceService, 
    private router: Router,  
    private fb: FormBuilder, 
    public imageService: UploadImageService, 
    private webUserService: WebUserService,
    private swal: SwalService){
    this.newExpForm = this.fb.group({
      expName: ['', Validators.required],
      expDescription: ['', Validators.required],
      imgURL:['']
    })
  }

  ngOnInit(): void {
    this.webUserService.getCurrentUser().subscribe({
      next:data=>{
        this.webUser=data;
        console.log(this.webUser);
      }
    })
  }

  onCreate(): void {
    this.imgURL=this.imageService.imgURL;

    const exp = new Experience(this.newExpName, this.newExpDescription, this.imgURL);
    this.experienceServ.create(exp).subscribe(data => {
      this.swal.successAlert("Success!", "Experience Added");
    }, err => {
     this.swal.errorAlert("Error!", err.error.msg);
    });
    this.imgURL="";
    this.imageService.imgURL="";
  }

  uploadImage($event: any){
    const name = "user" + this.webUser.name+ "exppic"+ this.newExpName;
    this.imageService.uploadImage($event, name);
  }
}
