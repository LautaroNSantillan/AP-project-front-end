import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { TokenService } from 'src/app/services/token.service';
import { Storage, getDownloadURL, ref} from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { CvDownloadService } from 'src/app/services/cv-download.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLogged = false;
  menu: Menu[] = [];

  constructor(private _menuService: MenuService, 
    private router:Router, 
    private tokenService: TokenService, 
    private storage: Storage, 
    private http: HttpClient, 
    private cv: CvDownloadService,
    private auth: AuthService){}

  ngOnInit() {
    window.addEventListener('scroll', this.shrinkNav, true);

    this.isLoggedIn();
    this.loadMenu();
  }
  ngDoCheck() {
    this.isLoggedIn();
  }
  isLoggedIn(){
    if(this.auth.isLogged()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

  shrinkNav = (): void => {
    const navbar = document.getElementById('navbar');
  
    if (window.pageYOffset > 0) {
      navbar.classList.add('shrink');
    } else {
      navbar.classList.remove('shrink');
    }
  }

  onLogout(): void{
    this.tokenService.logout();
    window.location.reload();
  }

  downloadCv(){
    this.cv.downloadCv();
  }

  async downloadCvXX() {
    console.log("Downloading");
    const fileRef = ref(this.storage, 'cv/SantillanLautaroNahuelFullstackJavaJr.pdf');
    let fileURL = null;
    try {
      fileURL = await getDownloadURL(fileRef);
      console.log(fileURL);
      // use fileURL to download the file
    } catch (error) {
      console.log('Error getting download URL:', error);
    }

    this.http.get(fileURL, { 
      responseType: 'blob', 
      withCredentials: false 
    }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
    
  }

  loadMenu(){
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
        }
      )
  }
}
