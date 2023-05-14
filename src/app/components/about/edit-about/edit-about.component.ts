import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WebUser } from 'src/app/model/web-user';
import { SwalService } from 'src/app/services/swal.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.scss']
})
export class EditAboutComponent implements OnInit{
  webUser: WebUser = null;
  @Output() updateUser: EventEmitter<any> = new EventEmitter()


  constructor(private activatedRoute: ActivatedRoute, 
    private webUserService: WebUserService, 
    private router: Router, 
    public imageService: UploadImageService,
    @Inject(MAT_DIALOG_DATA) public data:{ id: number },
    private swal: SwalService,){
  }

  ngOnInit( ): void {
    const id = this.data.id;

    this.webUserService.getWebUser(id).subscribe({
      next: res =>{
        console.log(res);
        this.webUser = res;
      },
      error: err=>{
        console.log(err);
        alert("ERROR "+ err.error.msg);
      },
    });
  }

  onUpdate(){
    const id = this.data.id;
    this.webUser.img=this.imageService.imgURL;
    this.webUserService.updateWebUser(id, this.webUser).subscribe({
      next:res=>{
        this.swal.modified(res.msg);
        this.updateUser.emit();
    },
      error:err=>{
        this.swal.errorAlert("Error!", err.error.msg);
    }
    });   
  }

  uploadImage($event: any){
    const id = this.data.id;
    const name = "profilepicuser#"+id;
    this.imageService.uploadImage($event, name);
  }
}
