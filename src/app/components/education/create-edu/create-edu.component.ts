import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-create-edu',
  templateUrl: './create-edu.component.html',
  styleUrls: ['./create-edu.component.scss']
})
export class CreateEduComponent {
  newEduForm: FormGroup;
  eduName: string;
  eduDescription: string;

  constructor(private fb : FormBuilder, private router: Router, private educationServ: EducationService){
    this.newEduForm = fb.group({
      eduName: ['', Validators.required],
      eduDescription: ['', Validators.required]
    })
  }

  onCreate(): void{
    this.eduName=this.newEduForm.value.eduName;
    this.eduDescription=this.newEduForm.value.eduDescription;
    console.log(this.eduName, this.eduDescription);

    const education = new Education(this.eduName, this.eduDescription);

    this.educationServ.saveEdu(education).subscribe(data => {
      console.log(data);
      alert("correcto");
      this.router.navigate(['dashboard']);
    },err=>{
      console.log(err);
      alert(err.error.msg);
    })

  }

}
