import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent implements OnInit{
  skillToMod: Skill = null;
  editSkillForm: FormGroup;

  constructor(private skillService: SkillService, private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder){
    this.editSkillForm=this.fb.group({
      skillName: ['', Validators.required],
      skillPercentage: ['', Validators.required],
    })
  }


  ngOnInit(): void {
    const id  = this.activatedRoute.snapshot.params['id'];
    
    this.skillService.getSkill(id).subscribe({
      next: res=>{
        console.log(res);
        this.skillToMod=res;
      },
      error: err => {
        console.log(err);
        alert(err.error.msg);
      }
    })
  }

  onUpdate(): void {
    const id  = this.activatedRoute.snapshot.params['id'];

    this.skillToMod.skillName=this.editSkillForm.value.skillName;
    this.skillToMod.percentage=this.editSkillForm.value.skillPercentage;

    console.log(this.skillToMod.skillName, this.skillToMod.percentage);

    this.skillService.update(id, this.skillToMod).subscribe({
    next: res=>{
      this.router.navigate(['dashboard']);
    },
    error: err=>{
      console.log(err);
      alert(err.error.msg);
    }
    })
  }
}
