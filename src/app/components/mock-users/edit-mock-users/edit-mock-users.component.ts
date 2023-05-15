import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockUser } from 'src/app/model/mock-user';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-mock-users',
  templateUrl: './edit-mock-users.component.html',
  styleUrls: ['./edit-mock-users.component.scss'],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class EditMockUsersComponent {
  formattedDate: any;
  selectedDate: Date;
  form: FormGroup;
  myDate: Date = new Date();

  @Output() editMock = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{ id: number },
    private fb: FormBuilder,
    private mockUserService: UserService,
    private datePipe: DatePipe,
    private swal: SwalService
  ) {
    console.log(this.datePipe.transform(this.myDate, 'dd MMM yyyy'));

    this.form = fb.group({
      name: [''],
      lastName: [''],
      birthdate: [''],
    });
  }

  onEdit(): void {
    const mockuser = new MockUser(
      this.form.value.name,
      this.form.value.lastName,
      this.form.value.birthdate
    );
    mockuser.id=this.data.id;

    this.mockUserService.editUser(mockuser).subscribe({
      next: (data) => {
        let msg:string;
        if(data.msg == 'Modified.'){
          msg="Nothing modified";
        }else{
          msg=data.msg;
        }
        this.swal.successAlert("Success!", msg);
        this.editMock.emit();
      },
      error: (err) => {
        this.swal.errorAlert("Error!", err.error.msg);
      },
    });
  }
  onDateSelected(): void {
    this.selectedDate = this.form.value.birthdate;
  }
}
