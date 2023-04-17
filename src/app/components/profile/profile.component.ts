import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: user = new user("", "", "",new Date());

  constructor(public userService: UserService){}

  ngOnInit(): void {
    this.userService.getUser().subscribe(data => this.user =data);
  }
}
