import { Component } from '@angular/core';
import { MockUser } from 'src/app/model/mock-user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  mockUsers: MockUser[]=[];

  
}
