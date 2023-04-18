import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Experience } from 'src/app/model/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-create-exp',
  templateUrl: './create-exp.component.html',
  styleUrls: ['./create-exp.component.scss']
})
export class CreateExpComponent implements OnInit {
  newExpForm: FormGroup;
  newExpName: string="";
  newExpDescription: string="";

  constructor(private experienceServ: ExperienceService, private router: Router,  private fb: FormBuilder){
    this.newExpForm = this.fb.group({
      expName: ['', Validators.required],
      expDescription: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  onCreate(): void {
    this.newExpName = this.newExpForm.value.expName;
    this.newExpDescription = this.newExpForm.value.expDescription;
    console.log(this.newExpName, this.newExpDescription)

    const exp = new Experience(this.newExpName, this.newExpDescription);
    this.experienceServ.create(exp).subscribe(data => {
      alert("Experience Added")
      this.router.navigate(['/dashboard'])
    }, err => {
      console.log()
      alert(err.error)
    })
  }
}
