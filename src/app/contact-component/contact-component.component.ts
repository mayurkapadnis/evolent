import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppServiceService } from '../shared/app.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contact-component',
  templateUrl: './contact-component.component.html',
  styleUrls: ['./contact-component.component.scss']
})
export class ContactComponentComponent implements OnInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'PhoneNumber', 'Status', 'Action', 'Delete'];
  dataSource: any;
  contact: any;
  tabledata: any;
  constructor(private service: AppServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getContact().subscribe(data => {
      this.tabledata = data;
      this.dataSource = new MatTableDataSource(data);
    });
  }
  openDialog(element, index): void {
    const dialogRef = this.dialog.open(ContactDialog, {
      width: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (index == null) {
          this.tabledata.push(result);
          this.dataSource = new MatTableDataSource(this.tabledata);
        } else {
          this.tabledata[index] = result;
          this.dataSource = new MatTableDataSource(this.tabledata);
        }
      }
    });
  }

  delete(index) {
    if (index > -1) {
      this.tabledata.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource(this.tabledata);
  }
}


@Component({
  selector: 'contact-dialog',
  templateUrl: 'contact-dialog.html',
  styleUrls: ['./contact-component.component.scss']
})
export class ContactDialog implements OnInit {
  contactForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      Status: [false, [Validators.required]]
    });
  }
  ngOnInit() {
    this.contactForm.patchValue({
      FirstName: this.data.FirstName,
      LastName: this.data.LastName,
      Email: this.data.Email,
      PhoneNumber: this.data.PhoneNumber,
      Status: new FormControl(this.data.Status),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(form) {
    this.dialogRef.close(form.value);
  }

}
