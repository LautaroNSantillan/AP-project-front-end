import { Component, OnInit } from '@angular/core';
import { WebUser } from 'src/app/model/web-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isLogged=false;
  isAdmin=false;
  webUser: WebUser = null;

  constructor(private webUserService: WebUserService, private tokenService: TokenService, private auth: AuthService){}

  ngOnInit(): void {
    this.loadWebUser();
    this.isLogged=this.auth.isLogged();
    this.webUserService.getIsAdmin().subscribe({
      next:res=>{
        console.log(res);
        this.isAdmin=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  loadMyData(): void {
    this.webUserService
  }

  loadWebUser(): void {
    this.webUserService.getCurrentUser().subscribe({
      next: res=>{
        console.log(res);
        this.webUser=res;
      }
    });
  }

}
