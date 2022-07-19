import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../models/app.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  generateForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserComponent>,
              private formBuilder: FormBuilder,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: User) {
    const formConfig = {
      id: [(data) ? data.id : ''],
      name: [(data) ? data.name : '', [Validators.required]],
      surname: [(data) ? data.surname : '', [Validators.required]],
      date_of_birth: [(data) ? moment(data.date_of_birth).format("DD.MM.YYYY") : '', [Validators.required]],
      created: [(data) ? moment(data.created).format("DD.MM.YYYY HH:mm:ss") : ''],
      updated: [(data) ? moment(data.updated).format("DD.MM.YYYY HH:mm:ss") : '']
    };
    this.generateForm = this.formBuilder.group(formConfig);
  }

  ok() {
    if (this.generateForm.valid ) {
      this.dialogRef.close(this.generateForm.value);
    }
  }

}
