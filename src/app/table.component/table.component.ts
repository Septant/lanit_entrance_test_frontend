import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/app.model";
import {Subscription} from "rxjs";
import {AppManager} from "../managers/app.manager";
import {UserComponent} from "../user/user.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'surname', 'date_of_birth', 'created', 'updated', 'edit', 'delete'];
  dataSource: User[] = [];
  subscription: Subscription;

  constructor(private appManager: AppManager,
              private dialog: MatDialog) {
    this.subscription = appManager.userList().subscribe(result => {
      if (result) {
        this.dataSource = result;
      }
    });
    this.subscription.add(appManager.userListUpdate().subscribe ( result => {
      this.appManager.getUserList();
    }));
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


  deleteUser(id: number) {
    this.appManager.deleteUser(id);
  }

  createUser() {

    const dialogRef = this.dialog.open(UserComponent, {
      width: '700px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.appManager.createUser(result);
      }
    });
  }
}
