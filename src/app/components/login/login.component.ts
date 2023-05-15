import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { SwalService } from 'src/app/services/swal.service';
import { TokenService } from 'src/app/services/token.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { WebUserService } from 'src/app/services/web-user.service';
import { WebUser } from 'src/app/model/web-user';
import { Registerdto } from 'src/app/model/registerdto';

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

  validEmail: boolean;
  validForm: boolean = false;

  usernameReg: string;
  passwordReg: string;
  emailReg: string;
  nameReg: string;
  lastNameReg: string;

  roles: string[] = [];
  errorMsg!: string;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private loginError: MatSnackBar,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private swal: SwalService,
    private aRouter: ActivatedRoute,
    private titleService: Title,
    private renderer: Renderer2,
    private webUserService: WebUserService
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.setUp();
    this.setTitle();
    this.listenClose();
    this.listenCloseReg();
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.username, this.password);
    this.authService.login(this.loginUser).subscribe({
      next: (data) => {
        this.isLoggedIn = true;
        this.loginFailed = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router
          .navigate(['/dashboard/home'])
          .then((res) => this.swal.successAlert('Success!', 'Logged In!'));
      },
      error: (err) => {
        this.form.reset();
        this.isLoggedIn = false;
        this.loginFailed = true;
        this.errorMsg = err.message;
        this.swal.loginError();
      },
    });
  }

  hidebtn() {
    let btn = document.getElementById('mainButton');
    btn.classList.add('hidden');
  }
  showbtn() {
    let btn = document.getElementById('mainButton');
    btn.classList.remove('hidden');
  }

  onRegister() {
    let newUser = new Registerdto(
      this.nameReg,
      this.lastNameReg,
      this.usernameReg,
      this.emailReg,
      this.passwordReg
    );
    this.webUserService.registerWebUser(newUser).subscribe({
      next: (res) => {
        this.closeForm();
        this.swal.successAlert('Success!', res.msg);
      },
      error: (err) => {
        console.log(err);
        this.swal.errorAlert('Error!', err.error.msg);
      },
    });
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

  setUp() {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.loginFailed = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  setTitle() {
    this.aRouter.data.subscribe((data) => {
      this.titleService.setTitle(data['title']);
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  openForm() {
    let button = document.getElementById('mainButton');
    button.className = 'active';
  }

  isRegistrationFormEmpty(): boolean {
    return (
      !this.nameReg ||
      !this.lastNameReg ||
      !this.emailReg ||
      !this.usernameReg ||
      !this.passwordReg
    );
  }
  isLoginFormEmpty(): boolean {
    return !this.username || !this.password;
  }

  checkInput(input: any) {
    if (input.value.length > 0) {
      input.className = 'active';
    } else {
      input.className = '';
      console.log(input.value);
    }
  }

  checkBoth(input: any) {
    this.checkInput(input);
    this.checkEmail();
  }

  checkEmail() {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(this.emailReg)) {
      this.validEmail = true;
    } else {
      this.validEmail = false;
    }
    console.log(this.validEmail);
  }

  closeForm() {
    let button = document.getElementById('mainButton');
    button.className = '';
  }
  listenClose() {
    this.renderer.listen('document', 'keyup', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeForm();
      }
    });
  }

  openFormReg() {
    let button = document.getElementById('regButton');
    button.className = 'active';
  }

  closeFormReg() {
    let button = document.getElementById('regButton');
    button.className = '';
  }
  listenCloseReg() {
    this.renderer.listen('document', 'keyup', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeFormReg();
      }
    });
    this.showbtn();
  }
}
