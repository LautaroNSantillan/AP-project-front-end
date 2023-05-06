import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/user.model';
import { WebUser } from 'src/app/model/web-user';
import { UserService } from 'src/app/services/user.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  webUser: WebUser;

  constructor(public userService: UserService, private webUserService: WebUserService){}

  ngOnInit(): void {
    this.webUserService.getCurrentUser().subscribe({
      next:data=>{
        this.webUser=data;
      }
    })
  }
}
