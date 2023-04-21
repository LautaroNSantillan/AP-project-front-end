import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Storage, getDownloadURL, list, ref, uploadBytes} from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  imgURL: string='';

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string){
    const file = $event.target.files[0];

    const imgRef= ref(this.storage, `images/`+ name);

    uploadBytes(imgRef, file)
    .then(res=>{
      this.getImages();
    })
    .catch(err=>{
      console.error(err);
    });
  }

  getImages(){
    const imgRef=ref(this.storage, 'images');

    list(imgRef)
    .then(async res => {
      for (let i of res.items){
          this.imgURL = await getDownloadURL(i);
          console.log(this.imgURL);
      }
    })
    .catch(err=>{
      console.error(err);
    });
  }
}
