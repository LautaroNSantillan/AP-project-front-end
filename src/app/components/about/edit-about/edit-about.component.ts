import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebUser } from 'src/app/model/web-user';
import { WebUserService } from 'src/app/services/web-user.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.scss']
})
export class EditAboutComponent implements OnInit{
  webUser: WebUser = null;


  constructor(private activatedRoute: ActivatedRoute, private webUserService: WebUserService, private router: Router){
  }

  ngOnInit( ): void {
    const id = this.activatedRoute.snapshot.params['id'];

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
    const id = this.activatedRoute.snapshot.params['id'];
    this.webUserService.updateWebUser(id, this.webUser).subscribe({
      next:res=>{
        console.log(res);
        alert(res);
        this.router.navigate(['/dashboard'])
    },
      error:err=>{
      console.log(err)
      alert(err.error.msg)
    }
    });   
  }

  uploadImage($event: any){}
}
