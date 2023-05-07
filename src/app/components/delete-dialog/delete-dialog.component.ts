import { Component } from '@angular/core';
import { Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  @Input() thingtodelete: any;
  @Input() deleteMethod: () => void;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

}
