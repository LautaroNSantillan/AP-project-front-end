import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { TokenService } from 'src/app/services/token.service';
import { CvDownloadService } from 'src/app/services/cv-download.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  isLogged = false;
  isSidebarOpen = false;
  menu: Menu[] = [];

  constructor(
    private observer: BreakpointObserver,
    private _menuService: MenuService,
    private router: Router,
    private tokenService: TokenService,
    private auth: AuthService,
    private cv: CvDownloadService
  ) {}

  ngOnInit() {
    this.loadMenu();
    this.isLoggedIn();
  }

  onLogout(): void {
    this.tokenService.logout();
    window.location.reload();
  }

  isLoggedIn() {
    if (this.auth.isLogged()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  downloadCv() {
    this.cv.downloadCv();
  }

  loadMenu() {
    this._menuService.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }
}
