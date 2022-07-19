import {Injectable} from '@angular/core';
import {ResponseService} from "../server/response.service";
import {RequestService} from "../server/request.service";
import {BehaviorSubject, Subject} from "rxjs";
import {User} from "../models/app.model";

@Injectable({
  providedIn: 'root'
})
export class AppManager {

  constructor(private responseService: ResponseService,
              private requestService: RequestService) {
  }

  public userList(): BehaviorSubject<User[]> {
    return this.responseService.userList;
  }

  public getUserList(): void {
    this.requestService.getUserList();
  }

  public updateUser(user: User): void {
    this.requestService.updateUser(user);
  }

  public deleteUser(id: number): void {
    this.requestService.deleteUser(id);
  }

  public createUser(user: User): void {
    this.requestService.createUser(user);
  }

  public userListUpdate(): Subject<boolean> {
    return this.responseService.userListUpdated;
  }
}
