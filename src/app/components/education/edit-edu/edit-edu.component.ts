import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-edit-edu',
  templateUrl: './edit-edu.component.html',
  styleUrls: ['./edit-edu.component.scss'],
})
export class EditEduComponent implements OnInit {
  educationToEdit: Education = null;
  editEduForm: FormGroup;
  eduName: string;
  eduDescription: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private educationServ: EducationService
  ) {
    this.editEduForm = fb.group({
      eduName: ['', Validators.required],
      eduDescription: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.educationServ.getEdu(id).subscribe({
      next: (data) => {
        console.log(data);
        this.educationToEdit = data;
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
      }
    });
  }

  updateEdu(): void {
    this.eduName=this.editEduForm.value.eduName;
    this.eduDescription=this.editEduForm.value.eduDescription;
    console.log(this.eduName, this.eduDescription);

    const editedEdu = new Education(this.editEduForm.value.eduName, this.editEduForm.value.eduDescription);

    const id = this.activatedRoute.snapshot.params['id'];
    this.educationServ.updateEdu(id, editedEdu).subscribe({
      next: (data) => {
        console.log(data);
        alert("Success");
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
      }
    });
  }
}
