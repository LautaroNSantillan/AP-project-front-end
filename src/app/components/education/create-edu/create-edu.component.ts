import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Education } from 'src/app/model/education';
import { WebUser } from 'src/app/model/web-user';
import { EducationService } from 'src/app/services/education.service';
import { SwalService } from 'src/app/services/swal.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-create-edu',
  templateUrl: './create-edu.component.html',
  styleUrls: ['./create-edu.component.scss'],
})
export class CreateEduComponent implements OnInit {
  webUser: WebUser;
  newEduForm: FormGroup;
  eduName: string;
  imgURL: string;
  eduDescription: string;

  ngOnInit(): void {
    this.webUserService.getCurrentUser().subscribe({
      next: (data) => {
        this.webUser = data;
        console.log(this.webUser);
      },
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private educationServ: EducationService,
    public imageService: UploadImageService,
    private webUserService: WebUserService,
    private swal: SwalService
  ) {
    this.newEduForm = fb.group({
      eduName: ['', Validators.required],
      eduDescription: ['', Validators.required],
      imgURL: ['', Validators.required],
    });
  }

  onCreate(): void {
    this.imgURL = this.imageService.imgURL;


    const education = new Education(
      this.eduName,
      this.eduDescription,
      this.imgURL
    );

    this.educationServ.saveEdu(education).subscribe(
      (data) => {
        this.swal.successAlert('Created!', data.msg);
      },
      (err) => {
        this.swal.successAlert('Error!', err.error.msg);
      }
    );
  }

  uploadImage($event: any) {
    const name = 'user' + this.webUser.name + 'edupic' + this.eduName;
    this.imageService.uploadImage($event, name);
  }
}
