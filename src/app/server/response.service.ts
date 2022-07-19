import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {TitledText, User} from "../models/app.model";
import {ServerResponse} from "../models/server.model";
import {ServerAction, ServerResponseUserTable, ServerStatus} from "../models/server.model";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  userList = new BehaviorSubject<User[]>([]);
  alert = new Subject<TitledText>();
  userListUpdated = new Subject<boolean>();

  constructor() {
  }

  public serverResponse(res: Observable<ServerResponse>, action: ServerAction): void {
    res.subscribe(
      result => {
        if (result) {
          if (result.status === ServerStatus.success) {
            switch (action) {
              case ServerAction.users:
                const responseUserList = result as ServerResponseUserTable;
                this.userList.next((responseUserList.data) ? responseUserList.data : []);
                break;
              case ServerAction.user:
                this.userListUpdated.next(true);
                break;
            }

          } else if (result.status === ServerStatus.error) {
            this.alert.next({
              title: 'Внимание!',
              text: (result.message) ? result.message : 'Неизвестная ошибка'
            });
          } else {
            this.alert.next({title: 'Внимание', text: 'Неверный статус ответа'});
          }
        }
      },
      error => {
        const errorText = (error.statusText)
          ? error.statusText
          : (error.message)
            ? error.message
            : (error.detail)
              ? error.detail
              : (error.details)
                ? error.details
                : error.toString();
        console.error(error);
        this.alert.next({title: 'Внимание', text: errorText});
      });
  }
}
