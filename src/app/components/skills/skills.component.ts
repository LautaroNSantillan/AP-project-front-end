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

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills: Skill[] = [];
  isLogged: boolean = false;

  constructor(private skillService: SkillService, 
    private tokenService: TokenService, 
    private webUserService: WebUserService, 
    private router: Router,
    private createDialog: MatDialog,
    private editDialog: MatDialog,
    private deleteDialog: MatDialog){}

  ngOnInit(): void {
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

  loadSkills(): void {
    this.webUserService.getCurrentUserId().subscribe(userId => {
      this.skillService.getSkillByIdList(userId).subscribe(res => {
        console.log(res);
        this.skills = res;
      });
    });
    if(this.tokenService.getToken()){
          this.isLogged=true;
        }
        else{
          this.isLogged=false;
        }
  }

  disable(id :number): void{
    if(id!=undefined){
      this.skillService.disable(id).subscribe({
        next: res=>this.loadSkills(),
        error: err=> console.log(err)
      })
    }
  }

  openCreate(){
    this.createDialog.open(CreateSkillComponent,{
      width:'80%',
    });
  }

  openEdit(id:number): void{
    this.editDialog.open(EditSkillComponent,{
      width: '80%',
      data: { skillId: id }
    });
  }
  openDeleteDialog(id: number, name: string) {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      data: { thingtodelete: name }
    });

    dialogRef.componentInstance.thingtodelete = name;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.disable(id);
      }
    });
  }

}
