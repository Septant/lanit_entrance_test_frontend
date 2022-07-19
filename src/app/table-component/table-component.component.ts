import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/app.model";
import {Subscription} from "rxjs";
import {AppManager} from "../managers/app.manager";
import {UserComponent} from "../user/user.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'surname', 'date_of_birth', 'created', 'updated', 'edit'];
  dataSource: User[] = [];
  subscription: Subscription;

  constructor(private appManager: AppManager,
              private dialog: MatDialog) {
    this.subscription = appManager.userList().subscribe(result => {
      if (result) {
        this.dataSource = result;
        console.log(result);
      }
    })
  }

  ngOnInit(): void {
    this.appManager.getUserList();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '700px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.appManager.updateUser(result);
      }
    });
  }


}
