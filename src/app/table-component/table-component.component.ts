import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../models/app.model";
import {Subscription} from "rxjs";
import {AppManager} from "../managers/app.manager";

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'surname', 'date_of_birth', 'created', 'updated'];
  dataSource: User[] = [];
  subscription: Subscription;
  editedUser: User|null = null;
  isEdit: boolean = false;

  constructor(private appManager: AppManager) {
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

  editUser(userId: number) {
    this.isEdit = true;
    if(this.editedUser)
    this.editedUser =  this.dataSource[userId];
  }

  saveUser() {
    this.isEdit = false;
    if(this.editedUser)
    this.appManager.updateUser(this.editedUser.id, this.editedUser.name, this.editedUser.surname, this.editedUser.date_of_birth);
  }

 /* isEdit: boolean = false;

  editIt(id: number) {
     this.isEdit = true;
  }


  send(id: number, name: string, surname: string, date_of_birth: string) {

    this.appManager.updateUserList(id, name, surname, date_of_birth);
  }

  cancel() {

  }*/
  cancel() {
    this.isEdit = false;
    this.editedUser = null;
  }
}
