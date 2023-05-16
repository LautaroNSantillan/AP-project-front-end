import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';
import { WebUserService } from 'src/app/services/web-user.service';
import { CreateSkillComponent } from './create-skill/create-skill.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SwalService } from 'src/app/services/swal.service';
import { CircleProgressComponent } from 'ng-circle-progress';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills: Skill[] = [];
  isLogged: boolean = false;
  isProfile: boolean;

  constructor(private skillService: SkillService, 
    private tokenService: TokenService, 
    private webUserService: WebUserService, 
    private router: Router,
    private createDialog: MatDialog,
    private editDialog: MatDialog,
    private deleteDialog: MatDialog,
    private swal: SwalService,
    private auth: AuthService){}

  ngOnInit(): void {
    this.setIsProfile();
    this.setIsLoggedIn();

    const currentRoute = this.router.url;

    if(currentRoute=="/dashboard/profile"){
      this.loadSkills();
    }else{
      this.webUserService.getMe().subscribe({
        next:data=>{
          this.skills=data.skills;
        }
      })
    }
  }
  setIsLoggedIn(){
    this.isLogged=this.auth.isLogged();
  }

  loadSkills(): void {
    this.webUserService.getCurrentUserId().subscribe(userId => {
      this.skillService.getSkillByIdList(userId).subscribe(res => {
        this.skills = res;
      });
    });
  }

  disable(id :number): void{//obsolete
    if(id!=undefined){
      this.skillService.disable(id).subscribe({
        next: res=>this.loadSkills(),
        error: err=> console.log(err)
      })
    }
  }

  openCreate(){
    this.createDialog.open(CreateSkillComponent,{
      width:'60%',
    });
  }

  openEdit(id:number): void{
    this.editDialog.open(EditSkillComponent,{
      width: '60%',
      data: { skillId: id }
    });
  }


  openDeleteDialog(id: number, name: string){
    this.swal.deleteDialog(id, name, () => {
      this.disable(id);
    });
  }
  setIsProfile():void{
    const currentRoute = this.router.url;
    if(currentRoute=="/dashboard/profile") this.isProfile=true;
    else this.isProfile=false;
  }

}
