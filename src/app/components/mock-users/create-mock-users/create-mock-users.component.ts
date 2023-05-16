import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MockUser } from 'src/app/model/mock-user';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-mock-users',
  templateUrl: './create-mock-users.component.html',
  styleUrls: ['./create-mock-users.component.scss'],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class CreateMockUsersComponent {
  formattedDate: any;
  selectedDate: Date;
  form:FormGroup;
  myDate: Date = new Date();

  constructor(private fb: FormBuilder, 
    private mockUserService: UserService, 
    private datePipe: DatePipe,
    private swal: SwalService){
    console.log(this.datePipe.transform(this.myDate, 'dd MMM yyyy'));

    this.form = fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
    })
  }


  onCreate(): void{

    const mockuser = new MockUser(this.form.value.name, this.form.value.lastName, this.form.value.birthdate);

    this.mockUserService.createUser(mockuser).subscribe(data => {
      this.swal.successAlert("Success!", "Mock user created successfully")     
    },err=>{
      this.swal.errorAlert("ERROR!",err.error.msg );
    })
  }
  onDateSelected(): void {
    this.selectedDate = this.form.value.birthdate;
  }
}
