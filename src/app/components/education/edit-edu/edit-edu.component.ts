import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/services/education.service';
import { SwalService } from 'src/app/services/swal.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-edit-edu',
  templateUrl: './edit-edu.component.html',
  styleUrls: ['./edit-edu.component.scss'],
})
export class EditEduComponent implements OnInit {
  educationToEdit: Education = null;
  editEduForm: FormGroup;
  eduName: string;
  imgURL: string;
  newimgURL: string;
  eduDescription: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { eduId: number },
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private educationServ: EducationService,
    public imageService: UploadImageService,
    private swal: SwalService
  ) {
    this.editEduForm = fb.group({
      eduName: ['', Validators.required],
      eduDescription: ['', Validators.required],
      imgURL: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.data.eduId;

    this.educationServ.getEdu(id).subscribe({
      next: (data) => {
        this.educationToEdit = data;
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }

  updateEdu(): void {
    console.log(this.eduName, this.eduDescription);

    const editedEdu = new Education(
      this.eduName,
      this.eduDescription,
      this.imgURL
    );

    const id = this.data.eduId;
    this.educationServ.updateEdu(id, editedEdu).subscribe({
      next: (data) => {
        this.swal.successAlert('Success!', data.msg);
      },
      error: (err) => {
        this.swal.errorAlert('Error!', err.error.msg);
      },
    });
    this.imgURL ="";
  }

  uploadImage($event: any) {
    const id = this.data.eduId;
    const name = 'edupic#' + id;
    this.imageService
      .uploadImage($event, name)
      .then((url) => {
        this.imgURL = url;
        this.newimgURL = url;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
