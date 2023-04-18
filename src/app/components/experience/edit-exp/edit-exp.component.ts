import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from 'src/app/model/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-edit-exp',
  templateUrl: './edit-exp.component.html',
  styleUrls: ['./edit-exp.component.scss']
})
export class EditExpComponent implements OnInit {
  editExpForm: FormGroup;
  expToMod: Experience = null;

  constructor(private experienceServ: ExperienceService, private activatedRouter: ActivatedRoute, private router: Router, private fb: FormBuilder){
    this.editExpForm=this.fb.group({
      expName: ['', Validators.required],
      expDescription: ['', Validators.required],
    })
  }

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.experienceServ.detail(id).subscribe(res=>{
      this.expToMod = res;
    },err=>{
      console.log(err)
      alert("ERROR"+ err.error)
    })
  }

  onUpdate(): void{
    this.expToMod.expName = this.editExpForm.value.expName;
    this.expToMod.expDescription = this.editExpForm.value.expDescription;

    const id = this.activatedRouter.snapshot.params['id'];
    this.experienceServ.update(id, this.expToMod).subscribe(res=>{
      this.router.navigate(['/dashboard']);
    },err=>{
      console.log(err)
      alert("ERROR"+ err.error)
    })
  }
}
