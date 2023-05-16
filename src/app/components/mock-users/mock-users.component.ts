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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mock-users',
  templateUrl: './mock-users.component.html',
  styleUrls: ['./mock-users.component.scss'],
})
export class MockUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoggedIn: boolean = false;

  MOCK_USERS: MockUser[] = [];

  displayedColumns: string[] = ['name', 'lastName', 'birthdate', 'actions'];
  dataSource = new MatTableDataSource(this.MOCK_USERS);

  constructor(
    private mockService: UserService,
    private createDialog: MatDialog,
    private editDialog: MatDialog,
    private deleteDialog: MatDialog,
    private swal: SwalService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchAllUsers();
    this.setIsLoggedIn();
  }

  setIsLoggedIn() {
    this.isLoggedIn = this.auth.isLogged();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number): void {
    if (id != undefined) {
      this.mockService.delete(id).subscribe({
        next: (res) => {
          this.swal.successAlert('Success', 'Mock user deleted.');
          this.fetchAllUsers();
        },
        error: (err) => this.swal.errorAlert('Error', err.error.msg),
      });
    }
  }

  openCreate() {
    this.createDialog.open(CreateMockUsersComponent, {
      width: '80%',
    });
  }

  openEdit(id: number): void {
    const dialogRef = this.editDialog.open(EditMockUsersComponent, {
      width: '60%',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAllUsers();
    });
  }

  openDeleteDialog(id: number, name: string) {
    this.swal.deleteDialog(id, name, () => {
      this.delete(id);
    });
  }

  fetchAllUsers() {
    this.mockService.allUsers().subscribe({
      next: (res) => {
        this.MOCK_USERS = res;
        this.dataSource.data = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
