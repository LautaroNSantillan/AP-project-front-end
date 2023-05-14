import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MockUser } from 'src/app/model/mock-user';
import { CreateMockUsersComponent } from './create-mock-users/create-mock-users.component';
import { EditMockUsersComponent } from './edit-mock-users/edit-mock-users.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/services/swal.service';


@Component({
  selector: 'app-mock-users',
  templateUrl: './mock-users.component.html',
  styleUrls: ['./mock-users.component.scss'],
})
export class MockUsersComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  MOCK_USERS: MockUser[] = [
  ];
  
  displayedColumns: string[] = ['name', 'lastName', 'birthdate', 'actions'];
  dataSource = new MatTableDataSource(this.MOCK_USERS);

  constructor(
    private mockService: UserService,
    private createDialog: MatDialog,
    private editDialog: MatDialog,
    private deleteDialog: MatDialog,
    private swal: SwalService
    ){}

    ngOnInit(): void {
      this.fetchAllUsers();
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id :number): void{
    if(id!=undefined){
      this.mockService.delete(id).subscribe({
        next: res=>{
          this.swal.successAlert("Success","Mock user deleted." );
        },
        error: err=> this.swal.errorAlert("Error",err.error.msg )
      })
    }
  }

  openCreate(){
    this.createDialog.open(CreateMockUsersComponent,{
      width:'80%',
    });
  }

  openEdit(id:number): void{
    const dialogRef =this.editDialog.open(EditMockUsersComponent,{
      width: '80%',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAllUsers();
    });
  }
  // openDeleteDialog(id: number, name: string) {
  //   const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
  //     data: { thingtodelete: name }
  //   });

  //   dialogRef.componentInstance.thingtodelete = name;

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'confirm') {
  //       this.delete(id);
  //     }
  //   });
  // }

  openDeleteDialog(id: number, name: string){
    this.swal.deleteDialog(id, name, () => {
      this.delete(id);
    });
  }

  fetchAllUsers() {
    this.mockService.allUsers().subscribe({
      next: res => {
        console.log(res);
        this.MOCK_USERS = res;
        this.dataSource.data = res;
      },
      error: err => {
        console.error(err);
      }
    });
  }

}
