import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form:FormGroup;
  loading = false;

  constructor(private fb:FormBuilder, private loginError: MatSnackBar, private router: Router){
    this.form = this.fb.group({
      user:['', Validators.required],
      pwd:['', Validators.required],
    })

  }
  login(){
    const userInput = this.form.value.user;
    const pwdInput = this.form.value.pwd;
    console.log(userInput);
    console.log(pwdInput);

    if(userInput == "user" && pwdInput == "pwd"){
      this.isLoading();
      this.router.navigate(['dashboard']);
    }else{
      this.triggerLoginError();
      this.form.reset();
    }
  }

  triggerLoginError(){
    this.loginError.open('Invalid Credentials', 'OK', {
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition: 'bottom'
    });
  }

  isLoading(){
    this.loading = true;
    setTimeout(()=>{
      this.loading = false
    }, 2000)
  }
}
