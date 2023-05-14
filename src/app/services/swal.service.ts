import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  deleteDialog(id: number, name: string, callback: () => void) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        callback();
        Swal.fire({
          title: 'Deleted',
          text: `${name} has been deleted.`,
          icon: 'success',
          timer: 6000
        });
      }
    });
  }

  successAlert(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      timer: 6000,
      timerProgressBar: true,
      position: 'top-end',
      toast: true,
      showConfirmButton: false
    });
  }

  errorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 6000
    });
  }

  loginError(){
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'error',
      title: 'Login Failed',
      text: 'Please check your credentials and try again',
      timer: 6000
    })
  }

  modified(msg: string){
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: msg,
      timer: 6000
    });
  }
}
