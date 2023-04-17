import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  isLoggedIn = false;
  loginFailed = false;
  loginUser!: LoginUser;
  username!: string;
  password!: string;
  roles: string[] = [];
  errorMsg!: string;

  constructor(
    private fb: FormBuilder,
    private loginError: MatSnackBar,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required],
    });
  }
  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.loginFailed = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.form.value.user, this.form.value.pwd);
    this.authService.login(this.loginUser).subscribe(
      (data) => {
        this.isLoggedIn = true;
        this.loginFailed = false;
        console.log(data);
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.isLoggedIn = false;
        this.loginFailed = true;
        this.errorMsg = err.message;
        console.log(this.errorMsg);
      }
    );
  }

  //register

  login() {
    const userInput = this.form.value.user;
    const pwdInput = this.form.value.pwd;
    console.log(userInput);
    console.log(pwdInput);

    if (userInput == 'user' && pwdInput == 'pwd') {
      this.isLoading();
      this.router.navigate(['dashboard']);
    } else {
      this.triggerLoginError();
      this.form.reset();
    }
  }

  triggerLoginError() {
    this.loginError.open('Invalid Credentials', 'OK', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  isLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
