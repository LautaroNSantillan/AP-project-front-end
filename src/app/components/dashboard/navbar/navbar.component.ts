import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLogged = false;
  menu: Menu[] = [];

  constructor(private _menuService: MenuService, private router:Router, private tokenService: TokenService){}

  ngOnInit() {
    this.loadMenu();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

  onLogout(): void{
    this.tokenService.logout();
    window.location.reload();
  }


  loadMenu(){
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
        }
      )
  }
}
