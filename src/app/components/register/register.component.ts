import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Registerdto } from 'src/app/model/registerdto';
import { RegisterService } from 'src/app/services/register.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private registerService: RegisterService){
    this.registerForm = fb.group({
      name:['', Validators.required],
      lastName:['', Validators.required],
      username:['', Validators.required],
      email:['', Validators.required],
      pwd:['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  register(): void{
    const registerDTO = new Registerdto(this.registerForm.value.name, 
      this.registerForm.value.lastName, 
      this.registerForm.value.username, 
      this.registerForm.value.email, 
      this.registerForm.value.pwd);

    this.registerService.register(registerDTO).subscribe({
      next:res=>{
        console.log(res);
      },
      error:err=>{
        console.log(err);
      }
    });
  }
}
