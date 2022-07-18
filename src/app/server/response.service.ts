import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/app.model";
import {
  ServerResponse,
  TitledText
} from "../models/server.model";
import {ServerAction, ServerResponseUserTable, ServerStatus} from "../models/server.model";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  userTable = new BehaviorSubject<User[]>([]);
  alert = new Subject<TitledText>();

  constructor() {
  }

  public serverResponse(res: Observable<ServerResponse>, action: ServerAction): void {
    res.subscribe(
      result => {
        if (result) {
          if (result.status === ServerStatus.success) {
            switch (action) {
              case ServerAction.userTable:
                const responseUserList = result as ServerResponseUserTable;
                this.userTable.next((responseUserList.data) ? responseUserList.data : []);
                break;
              /*case ServerAction.updateUsersTable:
                const responseAnswer = result as ServerResponseAnswer;
                this.answer.next((responseAnswer.data) ? responseAnswer.data : null);
                break;*/
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
