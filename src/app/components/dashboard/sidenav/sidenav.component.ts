import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDrawerContent, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { TokenService } from 'src/app/services/token.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  
})
export class SidenavComponent {
  isLogged = false;
  isSidebarOpen = false;
  menu: Menu[] = [];

  constructor(private observer:BreakpointObserver, private _menuService: MenuService, private router:Router, private tokenService: TokenService, private auth: AuthService){}

  ngOnInit() {
    this.loadMenu();
    this.isLogged=this.auth.isLogged();
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


