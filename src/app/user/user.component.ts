import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../models/app.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
      id: [(data) ? data.id : '', {disabled: true}],
      name: [(data) ? data.name : '', [Validators.required]],
      surname: [(data) ? data.surname : '', [Validators.required]],
      date_of_birth: [(data) ? data.date_of_birth : '', [Validators.required]],
      created: [(data) ? data.created : '', {disabled: true}],
      updated: [(data) ? data.updated : '', {disabled: true}],
    };
    this.generateForm = this.formBuilder.group(formConfig);
  }

  ok() {
    this.dialogRef.close(this.generateForm.value);
  }
}
