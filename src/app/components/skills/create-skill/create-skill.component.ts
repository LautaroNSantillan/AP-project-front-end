import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss']
})
export class CreateSkillComponent {
  newSkillForm: FormGroup;

  constructor(private fb: FormBuilder, private skillService: SkillService, private router: Router){
    this.newSkillForm = this.fb.group({
      skillName: ['', Validators.required],
      skillPercentage: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  onCreate(): void{
    const skill = new Skill(this.newSkillForm.value.skillName, this.newSkillForm.value.skillPercentage);
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

}
