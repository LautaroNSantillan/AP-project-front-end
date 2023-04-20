import { Component, OnInit } from '@angular/core';
import { WebUser } from 'src/app/model/web-user';
import { TokenService } from 'src/app/services/token.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isLogged=false;
  webUser: WebUser = null;

  constructor(private webUserService: WebUserService, private tokenService: TokenService){}

  ngOnInit(): void {
    this.loadWebUser();
    if(this.tokenService.getToken()){
      console.log("logged")
      this.isLogged=true;
    }
    else{
      console.log("not logged")
      this.isLogged=false;
    }
  }

  loadWebUser(): void {
    this.webUserService.getWebUser(1).subscribe({
      next: res=>{
        console.log(res);
        this.webUser=res;
      }
    });
  }

}
