import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Education } from 'src/app/model/education';
import { WebUser } from 'src/app/model/web-user';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/token.service';
import { WebUserService } from 'src/app/services/web-user.service';
import { CreateEduComponent } from './create-edu/create-edu.component';
import { EditEduComponent } from './edit-edu/edit-edu.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  education: Education[] = [];
  isLogged = false;
  webUser: WebUser = null;
  isProfile: boolean;

  constructor(
    private educationServ: EducationService,
    private tokenServ: TokenService,
    private auth: AuthService,
    private webUserService: WebUserService,
    private router: Router,
    private createDialog: MatDialog,
    private editDialog: MatDialog,
    private deleteDialog: MatDialog,
    private swal: SwalService
  ) {}

  ngOnInit(): void {
    this.loadEducation();
    this.setIsProfile();
    this.isLogged = this.auth.isLogged();
  }

  loadEducation(): void {
    const currentRoute = this.router.url;

    if (currentRoute == '/dashboard/profile') {
      this.webUserService.getCurrentUserId().subscribe((userId) => {
        this.educationServ.getActiveEduById(userId).subscribe((res) => {
          console.log(res);
          this.education = res;
        });
      });
    } else {
      this.webUserService.getMe().subscribe({
        next: (data) => {
          console.log(data);
          this.education = data.education;
        },
      });
    }
  }

  setIsProfile(): void {
    const currentRoute = this.router.url;
    if (currentRoute == '/dashboard/profile') this.isProfile = true;
    else this.isProfile = false;
  }

  disable(id: number): void {
    if (id != undefined) {
      this.educationServ.disableEdu(id).subscribe(
        (res) => {
          console.log(res);
          this.loadEducation();
        },
        (err) => {
          alert(err.error.msg);
        }
      );
    }
  }

  openCreate() {
   const dialog=  this.createDialog.open(CreateEduComponent, {
      width: '60%',
    });
    dialog.afterClosed().subscribe(result => {
      this.loadEducation();
    });
  }

 openEdit(id:number): void{
   const dialog = this.editDialog.open(EditEduComponent,{
     width: '60%',
    data: { eduId: id }
   });
   dialog.afterClosed().subscribe(result => {
    this.loadEducation();
  });
 }
  // openDeleteDialog(id: number, name: string) {
  //   const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
  //     data: { thingtodelete: name }
  //   });

  //   dialogRef.componentInstance.thingtodelete = name;

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'confirm') {
  //       this.disable(id);
  //     }
  //   });
  // }

  openDeleteDialog(id: number, name: string) {
    this.swal.deleteDialog(id, name, () => {
      this.disable(id);
    });
  }
}
